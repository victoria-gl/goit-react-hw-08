import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../components/Title";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactForm from "../../components/ContactForm/ContactForm";
import Notification from "../../components/Notifications/Notifications";
import {
  selectContacts,
  selectFilteredContacts,
  selectIsLoading,
  selectError,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(selectContacts);
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <div>
      <DocumentTitle>Your contacts</DocumentTitle>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <p>Request in progress...</p>}
      {visibleContacts.length === 0 ? (
        contacts.length !== 0 ? (
          <Notification text={"There are no contacts matching your request."} />
        ) : (
          <>
            <Notification
              text={"There are no contacts yet, but you can add new one's!"}
            />
          </>
        )
      ) : (
        <ContactList />
      )}
    </div>
  );
}
