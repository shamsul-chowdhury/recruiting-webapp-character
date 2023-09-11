import { useState, useEffect, useMemo } from 'react';
import { SKILL_LIST } from './consts';
import {  ModifiersState, Skill } from './types';

interface SkillsProps {
    modifiers: ModifiersState;
    onSkillsChangeCallback: (skill: Skill[]) => void;
}

export default function SkillSet(props: SkillsProps): JSX.Element {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [totalPoints, setTotalPoints] = useState(10); 

    const getModifierValue =(modifier: string)=>{
        let key: keyof typeof props.modifiers; 
        let modifierValue: number = 0 
        for (key in props.modifiers) {
            if (modifier === key){
                modifierValue = props.modifiers[key];  
                break;
            }
        }
        return modifierValue
    }

    useEffect(()=>{
        let tempSkill: Skill = {
            skillName: "",
            attributeModifier: "",
            skillPoint: 0,
            modifierPoint: 0,
            totalPoint: 0
        }
        let tempSkillsList: Skill[] = []
        for (let index in SKILL_LIST){
            const modPoint = getModifierValue(SKILL_LIST[index].attributeModifier)
            tempSkill.attributeModifier = SKILL_LIST[index].attributeModifier
            tempSkill.skillName = SKILL_LIST[index].name
            tempSkill.skillPoint = 0
            tempSkill.modifierPoint = 
            tempSkill.totalPoint = tempSkill.skillPoint + modPoint
            tempSkillsList.push(Object.assign({}, tempSkill))
        }
        setSkills(tempSkillsList)
        props.onSkillsChangeCallback(tempSkillsList)
    },[])

    useEffect(()=>{
        let tempSkillList = [...skills];
        let intelligenceValue: number = 0
        Object.keys(props.modifiers).forEach((key)=>{
            if (key === "Intelligence"){
                intelligenceValue = props.modifiers[key]
            }
            for (let index in tempSkillList){
                if (tempSkillList[index].attributeModifier === key){
                    tempSkillList[index].totalPoint = tempSkillList[index].totalPoint - tempSkillList[index].modifierPoint
                    tempSkillList[index].modifierPoint = props.modifiers[key]
                    tempSkillList[index].totalPoint += props.modifiers[key]
                }
            }
        })
        if (tempSkillList.length >0){
            setSkills(tempSkillList)
        }
        props.onSkillsChangeCallback(tempSkillList)
        setTotalPoints(10 + intelligenceValue*4);
    },[props.modifiers])

    const getTotalSkillPoint = (): number => {
        let totalSkillPoint: number = 0 
        for (let index in skills){
            totalSkillPoint += skills[index].skillPoint
        }
        return totalSkillPoint
    }

    const handleIncrementSkill = (skill:Skill) => {
        const usedSkillPoint: number = getTotalSkillPoint()
        if (usedSkillPoint < totalPoints) {
            let tempSkillList = [...skills];
            for (let index in tempSkillList){
                if (skill.skillName === tempSkillList[index].skillName){
                    tempSkillList[index].skillPoint += 1;
                    tempSkillList[index].totalPoint += 1;
                    break;
                }
            }
            setSkills(tempSkillList);
            props.onSkillsChangeCallback(tempSkillList)
        }else{
            window.alert("you need more skill points, upgrade Intelligence to get more")
        }
    };
    
    const handleDecrementSkill = (skill:Skill) => {
    if (skill.skillPoint > 0) {
        let tempSkillList = [...skills];
        for (let index in tempSkillList){
            if (skill.skillName === tempSkillList[index].skillName){
                tempSkillList[index].skillPoint -= 1;
                tempSkillList[index].totalPoint -= 1;
                break;
            }
        }
        setSkills(tempSkillList);
        props.onSkillsChangeCallback(tempSkillList)
       }
    }

    const memoizedSkills = useMemo(() => skills, [skills]);
    
    return (
        <div>
            <h2>Skills</h2>
            <p>Total skills points available: {totalPoints}</p>
            <ul style={{ listStyle: "none"}}>
            {memoizedSkills.map((skill: Skill) => (
                <li key={skill.skillName}>
                    {skill.skillName}: {skill.skillPoint} (Modifier: {skill.attributeModifier}): {skill.modifierPoint} 
                    <button onClick={() => handleIncrementSkill(skill)}>+</button>{' '}
                    <button onClick={() => handleDecrementSkill(skill)}>-</button>{' '} 
                    total: {skill.totalPoint}
                </li>
            ))}          
            </ul>
        </div>
    )
}
