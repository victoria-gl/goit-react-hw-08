import css from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const handleFilterChange = (filter) => dispatch(changeFilter(filter));
  return (
    <div>
      <p className={css["search-p"]}>Find contacts by name&#128270;</p>
      <input
        className={css["search-input"]}
        type="text"
        value={nameFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
    </div>
  );
};
export default SearchBox;
