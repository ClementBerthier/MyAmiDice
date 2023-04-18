import { useContext, useEffect, useState } from 'react'
import { Button, Progress } from 'semantic-ui-react'
import api from '../../api';
import { UserContext } from '../../Context/UserContext';

import './style.scss';

function BarreStatPvPM({maxData, currentData, HPorMP, hisCharacter, isMj}) {

    const [user, setUser] = useContext(UserContext);
    const ratioHp = 100/maxData
    const [percent, setPercent] = useState(100);
    const [current_hp, setCurrentHP] = useState(currentData)
    const [current_mana, setCurrentMP] = useState(currentData)
    const [max_hp, setMax_hp] = useState(maxData)
    const [max_mana, setMax_mana] = useState(maxData)
    const [characteristic, setCharacteristic] = useState(hisCharacter.Characteristics[0])
    const [isClick, setIsClick] = useState(false)
    const [toggleHP, setTogglesHP] = useState(false)
    const [toggleMP, setTogglesMP] = useState(false)

    const increment = () => {
        if(toggleHP){
            setMax_hp(prevMaxHp => (prevMaxHp + 1))
        }else if (toggleMP){
            setMax_mana(prevMaxMp => (prevMaxMp + 1))
        } else {
            setPercent(prevPercent => (prevPercent < 100 ? (prevPercent + ratioHp) : 100))
        }
    }

  
    const decrement = () => {
        if(toggleHP){
            setMax_hp(prevMaxHp => (prevMaxHp - 1))
        }else if (toggleMP){
            setMax_mana(prevMaxMp => (prevMaxMp - 1))
        } else {
            setPercent(prevPercent => (prevPercent > 0 ? (prevPercent - ratioHp) : null))
        }
    }
    

    useEffect(()=>{
        const result = 100 / (maxData / currentData)
        setPercent(result)
    },[]) 
    
    useEffect(()=>{
        const result = (percent * maxData) / 100
        if(HPorMP === "hp"){
            setCurrentHP(Math.round(result))
        } else if (HPorMP === "mp"){
            setCurrentMP(Math.round(result))
        }
    },[percent])
    
    const handleClick = (event) => {        
        if(event.target.name === "pv"){
            setCharacteristic((characteristic)=> ({
                ...characteristic,
                current_hp: (current_hp),
                max_hp:(max_hp)
            }))
            console.log('characteristic after click pv', characteristic)
        } else if(event.target.name === "mp") {
            setCharacteristic((characteristic)=> ({
                ...characteristic,
                current_mana: (current_mana),
                max_mana:(max_mana)
            }))
            console.log('characteristic after click mp', characteristic)
        }
        setIsClick(!isClick)        
    }
    const handleClickMaxHp= (event) => {
        
        if(event.target.name === 'maxHp'){
           setTogglesHP(!toggleHP)
        }else if (event.target.name === 'maxMp'){
            setTogglesMP(!toggleMP)
        }

    }
    
    useEffect(()=>{
        async function sendCharacteriscic (){

            const formdata = {
                id: hisCharacter.id,
                strength: characteristic.strength,
                dexterity: characteristic.dexterity,
                constitution: characteristic.constitution,
                wisdom: characteristic.wisdom,
                charisma: characteristic.charisma,
                intelligence: characteristic.intelligence,
                level: characteristic.level,
                maxHp: characteristic.max_hp,
                maxMana: characteristic.max_mana,
                currentHP: characteristic.current_hp,
                currentMana: characteristic.current_mana,
                character_id: hisCharacter.id,
            }
            try{
                
                const data = await api.post("/characteristics/create", formdata)
                console.log('data avec api', data)

            } catch (error){

                throw new Error(error)
            }

        }
        sendCharacteriscic()

    }, [isClick])

  return (
    <div className='barreStat'>
        {(HPorMP === "hp")? 
            <div className='barreStatContainer'>
                <div className='progressBarreStat'>
                    <Progress id="pv" percent={percent} total={max_hp} value={current_hp} progress='ratio' color="red"/>
                </div>
                {!isMj?
                    <div className='buttonBarreStat'>
                        <Button onClick={decrement}>-</Button>
                        <Button onClick={increment}>+</Button>
                        <Button name='maxHp' onClick={handleClickMaxHp} toggle active={toggleHP}>Max Hp</Button>
                        <Button name='pv' onClick={handleClick} >Valider</Button>                    
                    </div>            
                : null
                }
               
            </div>       
        :
            <div className='barreStatContainer'>
                <div className='progressBarreStat'>
                    <Progress id="mp" percent={percent} total={max_mana} value={current_mana}  progress='ratio' color="blue"/>
                </div>
                {!isMj?
                    <div className='buttonBarreStat'>
                        <Button onClick={decrement}>-</Button>
                        <Button onClick={increment}>+</Button>
                        <Button name='maxMp' onClick={handleClickMaxHp} toggle  active={toggleMP} >Max Hp</Button>
                        <Button name='mp' onClick={handleClick}>Valider</Button>                    
                    </div>
                : null
                }
            </div>
        }
    </div>
  )
}

export default BarreStatPvPM

