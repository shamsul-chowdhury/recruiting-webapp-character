import { useState, useEffect } from 'react';
import { CLASS_LIST } from './consts';
import { AttributesState, ClassRequBoolean, ClassStateRequirement } from './types';

interface ClassesProps {
    attributes: AttributesState;
}


export default function Classes(props: ClassesProps): JSX.Element {
    const [classList, setClassList] = useState<string[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedClassReq, setSelectedClassReq] = useState<ClassStateRequirement | undefined>(undefined);
    const [classReqBoolean, setClassReqBoolean] = useState<ClassRequBoolean | undefined>(undefined);

    const handleClassSelection = (selectedClass: string) => {
        setSelectedClass(selectedClass);
        for (const key in CLASS_LIST){
            if (key === selectedClass){
                setSelectedClassReq(CLASS_LIST[key as keyof typeof CLASS_LIST])
                break;
            }
        }
    };

    const handleCloseClassReq = () => {
        setSelectedClass("");
        setSelectedClassReq(undefined);
    };

    useEffect(()=>{
        let tempList: string[] = []
        let classReqBool: ClassRequBoolean = {}
        for (const key in CLASS_LIST){
            tempList.push(key)
            classReqBool[key] = false;
        }
        setClassList(tempList)
        setClassReqBoolean(classReqBool)
    },[])

    useEffect(()=>{
        for (const key in CLASS_LIST){
            const minReq: ClassStateRequirement = CLASS_LIST[key as keyof typeof CLASS_LIST]
            const res = Object.keys(minReq).every(
                (attribute) =>  props.attributes[attribute] >= minReq[attribute]);
            if (res === true){
                setClassReqBoolean((prevState) => ({
                    ...prevState,
                    [key]: true,
                }));
            } else{
                setClassReqBoolean((prevState) => ({
                    ...prevState,
                    [key]: false,
                }));
            }       
        }
    },[props])

        
    return (
        <>
        <div>
            <h2>Classes</h2>
            <ul style={{ listStyle: "none"}}>
            {classList.map((classItem: string) => (
            <li key={classItem} >
                <button style={{ backgroundColor: classReqBoolean !== undefined && classReqBoolean[classItem] === true ? "red" : "white"}} onClick={() => handleClassSelection(classItem)}> {classItem}</button>
            </li>
            ))}
            </ul>
        </div>

        {selectedClass !=="" && selectedClassReq && (
            <div>
                <h3>Selected Class: {selectedClass}</h3>
                <p>Minimum Requirements:</p>
                <div>   
                    <p>Strength: {selectedClassReq['Strength']},</p>
                    <p>Dexterity: {selectedClassReq['Dexterity']},</p>
                    <p>Constitution: {selectedClassReq['Constitution']},</p>
                    <p>Intelligence: {selectedClassReq['Intelligence']},</p>
                    <p>Wisdom: {selectedClassReq['Wisdom']},</p>
                    <p>Charisma: {selectedClassReq['Charisma']}</p>
                </div>
                <button onClick={() => handleCloseClassReq()}>Cloase requirement view</button>
            </div>
        )}
      </>
    )
}
