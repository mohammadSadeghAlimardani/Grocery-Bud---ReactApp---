import { useState } from "react";
import { FaTrash, FaPencil } from "react-icons/fa6";

const SingleGrocery = (props) => {
    const {
        text,
        id,
        deleteItem,
        setInputValue,
        setEditFlag,
        setEditID,
        checked,
        groceryItems,
        setGroceryItems,
    } = props;

    const [checkValue, setCheckValue] = useState(checked);

    const handleCheck = (event) => {
        setCheckValue(event.target.checked);
        const newGroceryItems = groceryItems.map((SingleGrocery) => {
            if (SingleGrocery.id === id) {
                SingleGrocery.checked = event.target.checked;
            }
            return SingleGrocery;
        });
        setGroceryItems(newGroceryItems);
        localStorage.setItem("grocery-items", [
            JSON.stringify(newGroceryItems),
        ]);
    };

    return (
        <article className="single-grocery">
            <section>
                <input
                    type="checkbox"
                    checked={checkValue}
                    onChange={handleCheck}
                />
                <p style={{ textDecoration: checkValue ? "line-through" : "" }}>
                    {text}
                </p>
            </section>
            <section>
                <button className="link link-success">
                    <FaPencil
                        onClick={() => {
                            setInputValue(text);
                            setEditFlag(true);
                            setEditID(id);
                        }}
                    />
                </button>
                <button className="link link-dark">
                    <FaTrash onClick={() => deleteItem(id)} />
                </button>
            </section>
        </article>
    );
};

export default SingleGrocery;
