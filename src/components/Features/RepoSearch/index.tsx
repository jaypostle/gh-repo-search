import Dropdown from "@components/Display/Dropdown";
import { Input } from "@components/ui/input";
import useRepoSearch from "@hooks/useRepoSearch";
import { useState } from "react";
import Results from "./Results";
import { useDebounce } from "@hooks/useDebounce";
import LoadingSpinner from "@components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

function GithubRepoSearch() {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [orderBy, setOrderBy] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  const debouncedQuery = useDebounce(query, 500);

  const { error, data, isLoading, isFetching } = useRepoSearch(
    debouncedQuery,
    itemsPerPage,
    sortBy,
    orderBy,
    page
  );

  return (
    <div className="flex flex-col gap-8 items-center w-[600px]">
      <header className="flex flex-col gap-4 ">
        <Input
          type="text"
          placeholder="Search repositories..."
          className=""
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className="flex gap-4 justify-between">
          <Dropdown
            label="Items per page"
            items={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "30", label: "30" },
            ]}
            value={String(itemsPerPage)}
            onChange={(value) => {
              setItemsPerPage(Number(value));
            }}
          />
          <Dropdown
            label="Sort by"
            items={[
              { value: "best-match", label: "Best Match" },
              { value: "stars", label: "Stars" },
              { value: "updated", label: "Most Updated" },
            ]}
            value={sortBy}
            onChange={(value) => {
              setSortBy(value);
            }}
          />
          <Dropdown
            label="Order by"
            items={[
              { value: "desc", label: "Descending" },
              { value: "asc", label: "Ascending" },
            ]}
            value={orderBy}
            onChange={(value) => {
              setOrderBy(value);
            }}
          />
        </div>
      </header>
      <div className="flex flex-col gap-4 relative w-full">
        {isFetching && (
          <div className="absolute top-0 right-4">
            <LoadingSpinner />
          </div>
        )}
        <Results data={data} isLoading={isLoading} error={error} />
      </div>
      <footer className="flex flex-col gap-4 fixed bottom-0 left-0 w-full bg-white pt-4 pb-16">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={!query}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            <PaginationItem className="w-[50px]">{page}</PaginationItem>
            <PaginationItem>
              <PaginationNext
                disabled={!query}
                onClick={() => setPage((prev) => prev + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </footer>
    </div>
  );
}

export default GithubRepoSearch;
