import { useEffect, useState } from 'react';
import { AttributesState, ModifiersState } from './types';
import { ATTRIBUTE_LIST } from './consts';

interface AttributeProps {
    onAttributeChangeCallback: (attributes: AttributesState) => void;
    onModifierChangeCallback: (modifiers: AttributesState) => void;
  }

export default function Attribute(props: AttributeProps): JSX.Element {
    const [attributes, setAttributes] = useState<AttributesState>({});
    const [attributesModifier, setAttributesModifier] = useState<ModifiersState>({});
    const TOTAL_ATT_POINT = 70

    useEffect(()=>{
        let tempAttributes: AttributesState = {}
        let tempModifier: AttributesState = {}
        for (let index in ATTRIBUTE_LIST){
            tempAttributes[ATTRIBUTE_LIST[index]] = 10
            tempModifier[ATTRIBUTE_LIST[index]] = 0
        }
        setAttributes(tempAttributes)
        setAttributesModifier(tempModifier)
        props.onAttributeChangeCallback(tempAttributes)
        props.onModifierChangeCallback(tempModifier)
    },[])

    useEffect(()=>{
        props.onAttributeChangeCallback(attributes)
        props.onModifierChangeCallback(attributesModifier)
    },[attributes])

    const getTotalAttributePoint = (): number => {
        let totalAttributePoint: number = 0 
        Object.keys(attributes).forEach((attribute: string) =>{
            totalAttributePoint += attributes[attribute]
        });
        return totalAttributePoint
    }

    const handleIncrement = (attribute: string) => {
        const usedAttributePoint: number = getTotalAttributePoint()
        if (usedAttributePoint < TOTAL_ATT_POINT) {
            setAttributes((prevState) => ({
                ...prevState,
                [attribute]: prevState[attribute] + 1,
            }));
            const modifier = Math.floor(((attributes[attribute] + 1) - 10) / 2);
            setAttributesModifier((prevState) => ({
                ...prevState,
                [attribute]: modifier,
            }));
        }else{
            window.alert("A character can have up to 70 delegated attributes points")
        }
    };

    const handleDecrement = (attribute: string) => {
        setAttributes((prevState) => ({
        ...prevState,
        [attribute]: prevState[attribute] - 1,
        }));
        const modifier = Math.floor(((attributes[attribute] - 1) - 10) / 2);
        setAttributesModifier((prevState) => ({
            ...prevState,
            [attribute]: modifier,
        }));
    };

    return (
        <div>
            <h2>Attributes</h2>
            <ul style={{ listStyle: "none"}}>
                {Object.keys(attributes).map((attribute: string) => (
                <li key={attribute}>
                    {attribute}: {attributes[attribute]} (Modifier: {attributesModifier[attribute]})
                    <button onClick={() => handleIncrement(attribute)}>+</button>
                    <button onClick={() => handleDecrement(attribute)}>-</button>
                </li>
                ))}
            </ul>
        </div>
    );
};

