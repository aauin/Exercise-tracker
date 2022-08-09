import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, editName] = useState(exerciseToEdit.name);
    const [reps, editReps] = useState(exerciseToEdit.reps);
    const [weight, editWeight] = useState(exerciseToEdit.weight);
    const [unit, editUnit] = useState(exerciseToEdit.unit);
    const [date, editDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the exercise!");
        } else {
             alert(`Failed to edit exercise. Status code = ${response.status}`);
        }     
        history.push("/");
    };

    return (
        <div>
            <h1>Edit exercise and save</h1>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input
                            type="text"
                            value={name}
                            onChange={e => editName(e.target.value)} /></td>
                        <td><input
                            type="number"
                            value={reps}
                            onChange={e => editReps(e.target.value)} /></td>
                        <td><input
                            type="number"
                            value={weight}
                            onChange={e => editWeight(e.target.value)} /></td>
                        <td><select onChange={e => editUnit(e.target.value)}>
                            <option value="kgs" >kgs</option>
                            <option value="lbs" >lbs</option>
                            </select></td>
                        <td><input
                            type="text"
                            value={date}
                            onChange={e => editDate(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;