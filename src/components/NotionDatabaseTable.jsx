"use client";

import { ArrowDownIcon,ArrowUpDownIcon, ArrowUpIcon, FilterIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getPageCreatedTime, getPageTitle } from "@/lib/notion";

export default function NotionDatabaseTable({ pages, databaseProperties }) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState({});
  
  // 속성 값 추출 함수
  const getPropertyValue = (property) => {
    if (!property) return '';
    
    switch (property.type) {
      case 'title':
        return property.title?.[0]?.plain_text || '';
      case 'rich_text':
        return property.rich_text?.[0]?.plain_text || '';
      case 'select':
        return property.select?.name || '';
      case 'multi_select':
        return property.multi_select?.map(item => item.name).join(', ') || '';
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
  };

  // select/multi_select 속성의 고유 값들을 추출하는 함수
  const getUniqueSelectValues = (propertyKey) => {
    const values = new Set();
    
    pages.forEach(page => {
      const property = page.properties[propertyKey];
      if (!property) return;
      
      if (property.type === 'select' && property.select?.name) {
        values.add(property.select.name);
      } else if (property.type === 'multi_select' && property.multi_select) {
        property.multi_select.forEach(item => {
          if (item.name) values.add(item.name);
        });
      }
    });
    
    return Array.from(values).map(value => ({
      id: value,
      value: value,
      color: 'gray' // 기본 색상
    }));
  };

  // 필터링된 데이터 계산
  const filteredPages = useMemo(() => {
    if (Object.keys(columnFilters).length === 0) {
      return pages;
    }

    return pages.filter(page => {
      return Object.entries(columnFilters).every(([propertyKey, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return true;
        
        const property = page.properties[propertyKey];
        if (!property) return false;

        switch (property.type) {
          case 'select':
            return property.select?.name && filterValues.includes(property.select.name);
          case 'multi_select':
            return property.multi_select?.some(item => 
              item.name && filterValues.includes(item.name)
            );
          default:
            return true;
        }
      });
    });
  }, [pages, columnFilters]);

  // 필터 변경 핸들러 (다중 선택)
  const handleFilterChange = (propertyKey, value, checked) => {
    setColumnFilters(prev => {
      const currentValues = prev[propertyKey] || [];
      
      if (checked) {
        // 값 추가
        return {
          ...prev,
          [propertyKey]: [...currentValues, value]
        };
      } else {
        // 값 제거
        const newValues = currentValues.filter(v => v !== value);
        if (newValues.length === 0) {
          // 모든 값이 제거되면 해당 속성의 필터를 완전히 제거
          const { [propertyKey]: removed, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [propertyKey]: newValues
        };
      }
    });
  };

  // 모든 필터 초기화
  const clearAllFilters = () => {
    setColumnFilters({});
  };

  // 특정 속성의 필터 초기화
  const clearPropertyFilter = (propertyKey) => {
    setColumnFilters(prev => {
      const { [propertyKey]: removed, ...rest } = prev;
      return rest;
    });
  };

  // 속성 렌더링 함수
  const renderProperty = (page, propertyKey) => {
    if (!propertyKey || !page.properties) return '-';
    
    const property = page.properties[propertyKey];
    if (!property) return '-';

    switch (property.type) {
      case 'title':
        return (
          <div className="flex items-center space-x-2">
            {getPageTitle(page)}
          </div>
        );
      
      case 'select':
        return property.select?.name ? (
          <Badge variant={`notion${property.select?.color.charAt(0).toUpperCase() + property.select?.color.slice(1)}`} className="text-xs">
            {property.select.name}
          </Badge>
        ) : '-';
      
      case 'multi_select':
        return property.multi_select?.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {property.multi_select.map((item, index) => (
              <Badge key={index} variant={`notion${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`} className="text-xs">
                {item.name}
              </Badge>
            ))}
          </div>
        ) : '-';
      
      case 'date':
        return property.date?.start ? (
          <span className="text-sm text-gray-600">
            {new Date(property.date.start).toLocaleDateString('ko-KR')}
          </span>
        ) : '-';
      
      case 'checkbox':
        return (
          <Checkbox checked={property.checkbox} />
        );
      
      case 'number':
        return property.number?.toString() || '-';
      
      case 'url':
        return property.url ? (
          <a 
            href={property.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            링크
          </a>
        ) : '-';
      
      default:
        return getPropertyValue(property) || '-';
    }
  };

  // select/multi_select 속성에 대한 필터 헤더 렌더링
  const renderFilterHeader = (prop) => {
    if (prop.type === 'select' || prop.type === 'multi_select') {
      const uniqueValues = getUniqueSelectValues(prop.id);
      const currentFilters = columnFilters[prop.id] || [];
      
      return (
        <div className="flex items-center space-x-2">
          <span>{prop.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <FilterIcon className="h-3 w-3" />
                <span className="sr-only">필터 열기</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">필터</div>
                  {currentFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearPropertyFilter(prop.id)}
                      className="h-5 px-2 text-xs"
                    >
                      초기화
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  {uniqueValues.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.id}
                      checked={currentFilters.includes(option.value)}
                      onCheckedChange={(checked) => 
                        handleFilterChange(prop.id, option.value, checked)
                      }
                      className="text-xs"
                    >
                      <Badge variant="secondary" className="text-xs">
                        {option.value}
                      </Badge>
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                {currentFilters.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <div className="text-xs text-gray-500 mb-1">선택됨:</div>
                    <div className="flex flex-wrap gap-1">
                      {currentFilters.map((filter) => (
                        <Badge key={filter} variant="outline" className="text-xs">
                          {filter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
    
    return prop.name;
  };

  // 컬럼 정의
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => {column.toggleSorting(column.getIsSorted() === "asc")}} className="flex items-center space-x-2">
              <span>제목</span>
              {column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="w-4 h-4" />
              ) : (
                <ArrowUpDownIcon className="w-4 h-4" />
              )}
            </Button>
          );  
        },
        cell: ({ row }) => {
          const page = row.original;
          return (
            <div className="flex items-center space-x-2">
              <p className="line-clamp-2 truncate">
                {getPageTitle(page)}
              </p>
            </div>
          );
        },
        sortingFn: (rowA, rowB, columnId, desc) => {
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
          header: renderFilterHeader(prop),
          cell: ({ row }) => renderProperty(row.original, prop.id),
        };

        baseColumns.push(column);
      });
    }

    // 기본 메타데이터 컬럼 추가
    baseColumns.push(
      {
        accessorKey: "created_time",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => {column.toggleSorting(column.getIsSorted() === "asc")}} className="flex items-center space-x-2">
              <span>생성일</span>
              {column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="w-4 h-4" />
              ) : (
                <ArrowUpDownIcon className="w-4 h-4" />
              )}
            </Button>
          );
        },
        sortingFn: (rowA, rowB, columnId, desc) => {
          const pageA = rowA.original;
          const pageB = rowB.original;
          const createdTimeA = getPageCreatedTime(pageA);
          const createdTimeB = getPageCreatedTime(pageB);
          return createdTimeA.localeCompare(createdTimeB, undefined, { numeric: true });
        }, 
        cell: ({ row }) => {
          const page = row.original;
          return (
            <span className="text-sm text-gray-600">
              {new Date(getPageCreatedTime(page)).toLocaleDateString('ko-KR')}
            </span>
          );
        },
      },
    );

    return baseColumns;
  }, [databaseProperties, columnFilters]);

  // 행 클릭 핸들러
  const handleRowClick = (page) => {
    // 페이지 상세 페이지로 이동
    router.push(`/notes/${page.id}`);
  };

  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns} 
        data={filteredPages} 
        onRowClick={handleRowClick}
      />
    </div>
  );
}

NotionDatabaseTable.propTypes = {
  pages: PropTypes.array.isRequired,
  databaseProperties: PropTypes.array,
};
