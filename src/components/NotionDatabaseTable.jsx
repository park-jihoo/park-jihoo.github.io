"use client";

import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useCallback,useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, DataTableFilter } from "@/components/ui/data-table";
import { getPageCreatedTime, getPageTitle } from "@/lib/notion";

export default function NotionDatabaseTable({ pages, databaseProperties }) {
  const router = useRouter();

  // 속성 값 추출 함수
  const getPropertyValue = (property) => {
    if (!property) return "";

    switch (property.type) {
      case "title":
        return property.title?.[0]?.plain_text || "";
      case "rich_text":
        return property.rich_text?.[0]?.plain_text || "";
      case "select":
        return property.select?.name || "";
      case "multi_select":
        return property.multi_select?.map((item) => item.name).join(", ") || "";
      case "date":
        return property.date?.start || "";
      case "checkbox":
        return property.checkbox ? "Yes" : "No";
      case "number":
        return property.number || "";
      case "url":
        return property.url || "";
      case "email":
        return property.email || "";
      case "phone_number":
        return property.phone_number || "";
      default:
        return "";
    }
  };

  // select/multi_select 속성의 고유 값들을 추출하는 함수
  const getUniqueSelectValues = useCallback(
    (propertyKey) => {
      const values = new Set();

      pages.forEach((page) => {
        const property = page.properties[propertyKey];
        if (!property) return;

        if (property.type === "select" && property.select?.name) {
          values.add(property.select.name);
        } else if (property.type === "multi_select" && property.multi_select) {
          property.multi_select.forEach((item) => {
            if (item.name) values.add(item.name);
          });
        }
      });

      return Array.from(values).map((value) => ({
        id: value,
        value: value,
        color: "secondary",
      }));
    },
    [pages],
  );

  // 속성 렌더링 함수
  const renderProperty = useCallback((page, propertyKey) => {
    if (!propertyKey || !page.properties) return "-";

    const property = page.properties[propertyKey];
    if (!property) return "-";

    switch (property.type) {
      case "title":
        return (
          <div className="flex items-center space-x-2">
            {getPageTitle(page)}
          </div>
        );

      case "select":
        return property.select?.name ? (
          <Badge
            variant={`notion${property.select?.color.charAt(0).toUpperCase() + property.select?.color.slice(1)}`}
            className="text-xs"
          >
            {property.select.name}
          </Badge>
        ) : (
          "-"
        );

      case "multi_select":
        return property.multi_select?.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {property.multi_select.map((item, index) => (
              <Badge
                key={index}
                variant={`notion${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`}
                className="text-xs"
              >
                {item.name}
              </Badge>
            ))}
          </div>
        ) : (
          "-"
        );

      case "date":
        return property.date?.start ? (
          <span className="text-sm text-muted-foreground font-medium">
            {new Date(property.date.start).toLocaleDateString("ko-KR")}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        );

      case "checkbox":
        return <Checkbox checked={property.checkbox} />;

      case "number":
        return property.number?.toString() ? (
          <span className="text-sm font-medium">{property.number.toString()}</span>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        );

      case "url":
        return property.url ? (
          <a
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 text-sm underline transition-colors font-medium"
          >
            링크
          </a>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        );

      default: {
        const value = getPropertyValue(property);
        return value ? (
          <span className="text-sm font-medium">{value}</span>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        );
      }
    }
  }, []);

  // 컬럼 정의
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
              className="flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              <span>제목</span>
              {column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              ) : (
                <ArrowUpDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const page = row.original;
          return (
            <div className="flex items-center space-x-2">
              <p className="line-clamp-2 truncate font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                {getPageTitle(page)}
              </p>
            </div>
          );
        },
        sortingFn: (rowA, rowB, _columnId, _desc) => {
          const pageA = rowA.original;
          const pageB = rowB.original;
          const titleA = getPageTitle(pageA);
          const titleB = getPageTitle(pageB);
          return titleA.localeCompare(titleB, undefined, { numeric: true });
        },
      },
    ];

    // 데이터베이스 속성 컬럼 추가
    if (databaseProperties && databaseProperties.length > 0) {
      databaseProperties.forEach((prop) => {
        const column = {
          accessorKey: prop.id,
          accessorFn: (row) => {
            const property = row.properties[prop.id];
            if (!property) return '';
            
            switch (property.type) {
              case 'select':
                return property.select?.name || '';
              case 'multi_select':
                return property.multi_select?.map(item => item.name).join(', ') || '';
              case 'title':
                return property.title?.[0]?.plain_text || '';
              case 'rich_text':
                return property.rich_text?.[0]?.plain_text || '';
              case 'date':
                return property.date?.start || '';
              case 'checkbox':
                return property.checkbox ? 'Yes' : 'No';
              case 'number':
                return property.number || '';
              case 'url':
                return property.url || '';
              case 'email':
                return property.email || '';
              case 'phone_number':
                return property.phone_number || '';
              default:
                return '';
            }
          },
          header:
            prop.type === "select" || prop.type === "multi_select"
              ? ({ column }) => (
                  <DataTableFilter
                    column={column}
                    title={prop.name}
                    options={getUniqueSelectValues(prop.id)}
                  />
                )
              : prop.name,
          cell: ({ row }) => renderProperty(row.original, prop.id),
        };

        // select/multi_select 타입에 적절한 OR 필터 적용
        if (prop.type === "select") {
          column.filterFn = "or";
        } else if (prop.type === "multi_select") {
          column.filterFn = "multiSelectOr";
        }

        baseColumns.push(column);
      });
    }

    // 기본 메타데이터 컬럼 추가
    baseColumns.push({
      accessorKey: "created_time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            className="flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            <span>생성일</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ArrowUpDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </Button>
        );
      },
      sortingFn: (rowA, rowB, _columnId, _desc) => {
        const pageA = rowA.original;
        const pageB = rowB.original;
        const createdTimeA = getPageCreatedTime(pageA);
        const createdTimeB = getPageCreatedTime(pageB);
        return createdTimeA.localeCompare(createdTimeB, undefined, {
          numeric: true,
        });
      },
      cell: ({ row }) => {
        const page = row.original;
        return (
          <span className="text-sm text-muted-foreground">
            {new Date(getPageCreatedTime(page)).toLocaleDateString("ko-KR")}
          </span>
        );
      },
    });

    return baseColumns;
  }, [databaseProperties, getUniqueSelectValues, renderProperty]);

  // 행 클릭 핸들러
  const handleRowClick = (page) => {
    // 페이지 상세 페이지로 이동
    router.push(`/notes/${page.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <DataTable columns={columns} data={pages} onRowClick={handleRowClick} />
      </div>
    </div>
  );
}

NotionDatabaseTable.propTypes = {
  pages: PropTypes.array.isRequired,
  databaseProperties: PropTypes.array,
};
