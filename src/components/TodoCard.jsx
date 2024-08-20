
const TodoCard = ({ todos, todoIndex, handleDone }) => {
    return (
        <div>
            {todos.map((item, itemIndex) => (
                <div key={itemIndex}>
                    <input
                        id={`check-${todoIndex}-${itemIndex}`} // ID ekledik
                        name={`check-${itemIndex}`}
                        type="checkbox"
                        className=' '
                        checked={false}
                        onChange={handleDone}
                    />
                    <label className='cursor-pointer' htmlFor={`check-${todoIndex}-${itemIndex}`}>{item}</label>

                </div>
            ))}
        </div>
    );
};

export default TodoCard;
