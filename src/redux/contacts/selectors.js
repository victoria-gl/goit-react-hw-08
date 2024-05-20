import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";
export const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (selectedContacts, nameFilter) => {
    return selectedContacts.filter((contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);

export const selectIsLoading = (state) => state.isLoading;

export const selectError = (state) => state.error;
