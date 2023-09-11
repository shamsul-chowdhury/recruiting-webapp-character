import { useState } from 'react';
import Attribute from './Attributes';
import Classes from './Classes';
import { AttributesState, ModifiersState, Skill } from './types';
import SkillSet from './Skills';

interface CharactersProps {
    value: number;
  }

export default function Characters(props: CharactersProps): JSX.Element {
    const [attributes, setAttributes] = useState<AttributesState>({});
    const [modifiers, setModifiers] = useState<ModifiersState>({});
    const [skills, setSkills] = useState<Skill[]>([]);

    const onAttributeChangeCallback = (attributes: AttributesState) =>{
        setAttributes(attributes)
    }
    const onModifierChangeCallback = (modifiers: AttributesState) =>{
        setModifiers(modifiers)
    }

    async function saveCharacter(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "characterName": `Charactar${props.value}`,
                                    "attributes": attributes,
                                    "skills": skills
                                })
        };
        const gitUser: string = "shamsul-chowdhury"
        const URL: string = "https://recruiting.verylongdomaintotestwith.ca/api/{"+ gitUser +"}/character"
        try{
            const response = await fetch(URL, requestOptions);
            const data = await response.json();
            console.log("response", data)
        } catch(error){
            console.log("error", error)
        }
    }

    const onSkillsChangeCallback = (skill: Skill[]) => {
        setSkills(skill)
    }


  return (
    <div style={{width: "120%", padding: "10px"}}>
        <div style={{width: "100%"}}>
            <div style={{ marginLeft:"30px", border: "1px solid black"}}>
                <span>Charactar{props.value}</span>
                <button onClick={saveCharacter}>save character</button>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    <div>
                        <Attribute 
                            onAttributeChangeCallback={onAttributeChangeCallback} 
                            onModifierChangeCallback={onModifierChangeCallback}
                        />
                    </div>
                    <div>
                        <Classes attributes={attributes}/>
                    </div>
                    <div>
                        <SkillSet 
                            modifiers={modifiers} 
                            onSkillsChangeCallback={onSkillsChangeCallback} 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}


