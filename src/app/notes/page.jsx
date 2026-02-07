import { AlertCircle, FileText } from "lucide-react";

import NotionDatabaseTable from "@/components/NotionDatabaseTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllPagesFromDatabase,
  getDatabaseProperties,
  getDatabaseTitle,
} from "@/lib/notion";

function NotesError({ title, children, className = "" }) {
  return (
    <div
      className={`mx-auto max-w-2xl px-4 py-12 animate-in fade-in zoom-in-95 duration-500 ${className}`}
    >
      <Card className="border-destructive/50 overflow-hidden">
        <CardContent className="p-0">
          <Alert
            variant="destructive"
            className="flex flex-col items-center justify-center border-0 bg-transparent py-8 text-center"
          >
            <AlertCircle className="mb-4 size-10" />
            <AlertTitle className="mb-2 text-xl">{title}</AlertTitle>
            <AlertDescription>{children}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function NotesPage() {
  try {
    const databaseId = "619787c75b60479886c147cf746bfbb8";
    const [databaseResponse, databaseProperties, databaseTitle] =
      await Promise.all([
        getAllPagesFromDatabase(databaseId),
        getDatabaseProperties(databaseId),
        getDatabaseTitle(databaseId),
      ]);

    if (!databaseResponse || !databaseResponse.results) {
      return (
        <NotesError title="Error">
          Failed to load pages from the database.
        </NotesError>
      );
    }

    const pages = databaseResponse.results;
    const properties = databaseProperties.filter(
      (prop) => prop.type === "select",
    );

    return (
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="border-b border-border/80 pb-6 text-center sm:text-left">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--section-title)] lg:text-5xl">
            <span className="text-primary">📝</span> {databaseTitle}
          </h1>
        </header>

        {pages.length === 0 ? (
          <Card className="border-dashed border-border/80 bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="size-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No notes found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Check back later for new content.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/70 overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <NotionDatabaseTable
                pages={pages}
                databaseProperties={properties}
              />
            </CardContent>
          </Card>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading notes:", error);
    return (
      <NotesError title="Something went wrong">
        {error.message || "An error occurred while loading the notes."}
      </NotesError>
    );
  }
}
