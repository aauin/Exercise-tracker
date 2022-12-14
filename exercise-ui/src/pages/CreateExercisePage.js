import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise.");
        } else {
            alert(`Failed to add exercise. Status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Enter values for the exercise</h1>
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
                            onChange={e => setName(e.target.value)} /></td>
                        <td><input
                            type="number"
                            value={reps}
                            onChange={e => setReps(e.target.value)} /></td>
                        <td><input
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} /></td>
                        <td><select onChange={e => setUnit(e.target.value)}>
                            <option value="Choose unit" selected>Choose unit</option>
                            <option value="kgs" >kgs</option>
                            <option value="lbs" >lbs</option>
                            </select></td>
                        <td><input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button
                onClick={createExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;