import { keyInSelect, BasicOptions } from "readline-sync";

// Inspired by https://github.com/anseki/readline-sync/issues/60#issuecomment-324533678
// Pagination avoids very long lists to scroll though, as well as the hard limit at 35 items for keyInSelect
export const keyInSelectPaginated = (items: string[], query?: any, options?: BasicOptions | undefined): number => {
  if (items.length === 0) {
    return -1;
  }

  const maxItemsPerPage = 10;
  const maxPageIndex = Math.ceil(items.length / maxItemsPerPage) - 1;

  let pageIndex = 0;
  while (true) {
    const pageItems = [];
    let indexPrev = -1;
    let indexNext = -1;
    if (pageIndex > 0) {
      pageItems.push(`(PREVIOUS ${maxItemsPerPage} items)`);
      indexPrev = pageItems.length - 1;
    }
    pageItems.push(...items.slice(pageIndex * maxItemsPerPage, (pageIndex + 1) * maxItemsPerPage));
    if (pageIndex < maxPageIndex) {
      pageItems.push(
        `(NEXT ${pageIndex < maxPageIndex - 1 ? maxItemsPerPage : items.length - maxItemsPerPage * (pageIndex + 1)} item(s))`
      );
      indexNext = pageItems.length - 1;
    }
    console.log("\x1B[2J"); // clear screen
    const index = keyInSelect(pageItems, query, options);
    if (indexPrev !== -1 && index === indexPrev) {
      pageIndex--;
    } else if (indexNext !== -1 && index === indexNext) {
      pageIndex++;
    } else {
      return index === -1 ? index : index + pageIndex * maxItemsPerPage - (indexPrev === -1 ? 0 : 1);
    }
  }
};
