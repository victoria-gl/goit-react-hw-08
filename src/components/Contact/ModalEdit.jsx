import Modal from "react-modal";
import PropTypes from "prop-types";
import css from "./ModalEdit.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    maxWidth: "400px",
    height: "300px",
    backgroundColor: "rgb(252, 209, 190)",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
};

Modal.setAppElement("#root");

export const ModalEdit = ({
  isOpen,
  onRequestClose,
  contact,
  onSubmit,
  handleChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Edit Contact Modal"
    >
      <h2 className={css.title}>Edit Contact</h2>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          id="name"
          name="name"
          value={contact.name}
          onChange={handleChange}
          className={css.input}
          placeholder="Name"
        />
        <input
          type="text"
          id="number"
          name="number"
          value={contact.number}
          onChange={handleChange}
          className={css.input}
          placeholder="Phone number"
        />
        <div className={css.wrap}>
          <button type="submit" className={css.btn}>
            Save Changes
          </button>
          <button type="button" onClick={onRequestClose} className={css.btn}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

ModalEdit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
