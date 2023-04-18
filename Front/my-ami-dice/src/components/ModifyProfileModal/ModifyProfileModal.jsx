import { useEffect, useReducer, useState } from 'react'
import { Button, Form, Header, Modal } from 'semantic-ui-react';
//import bcrypt from "bcryptjs"
import './style.scss';

import api from '../../api'
import validator from "email-validator";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const initialState = {
	pseudo: '',
	firstName: '',
	lastName: '',
	email: '',
	confirmEmail: '',
	password: '',
	confirmPassword: '',
	error: ''
}

const MODIFY_PROFILE = "MODIFY_PROFILE";
const ERROR = "ERROR";
const RESET_ERROR = "RESET_ERROR";
const RESET_FORM = "RESET_FORM"

const actionModifyProfile = (name, value) => ({type: MODIFY_PROFILE, payload: {name, value}});

function reducer (state, action){
	switch (action.type){
		case MODIFY_PROFILE:
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case ERROR:
			return{
				...state,
				error: action.payload.error,
			}
		case RESET_ERROR:
			return{
				...state,
				error:"",
			}
		case RESET_FORM:
			return{
				...initialState,
			}				
		default:{
			throw new Error ('action not recognized')
		}
	}
}
{/* Regex pour la verification du mot de passe */}
function isValidPassword (password){
	const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{10,})/;
	return pattern.test(password)
}

function ModifyProfileModal({data, toDelete, isPassword}) {

	const [user, setUser] = useContext(UserContext);

	const [open, setOpen] = useState(false)
	const [state, dispatch] = useReducer(reducer, initialState)


	{/* useEffect s'active a chaque overture ou fermeture de modale pour clear le formulaire et les erreurs s'il y a n'a */} 
	useEffect(() => {
		dispatch({
			type: RESET_ERROR,
		});
		dispatch({
			type: RESET_FORM,
		})
	}, [open])


const handleSubmit = async (event) => {
	event.preventDefault()

	//const salt = await bcrypt.genSalt();
	//const hash = await bcrypt.hash(state.password, salt)


	const formData = {
		id: user.id, 
		pseudo: state.pseudo.trim(),
		email: state.email.trim(),
		firstname: state.firstName.trim(),
		lastname: state.lastName.trim(),
	}

/* 	const formDataPassword = {
		id: user.id,
		newPassword: state.password
	} */
	
	if (event.target.name === "formProfile"){
		if(state.email === state.confirmEmail){  {/* vérifie que les deux champs email sont identique*/}
			if(validator.validate(state.email)){  {/* verifie via emailValidator que le format de l'email soit bon */}
				try {
console.log("AVANT REQUETE : ", formData);
					const modifiedUser = await api.post(`/users/update`, formData); {/* Envoi au serveur du formulaire de modification profil*/}
console.log("APRES REQUETE : ", modifiedUser);
//TODO: setUser pour mettre à jour les infos
					const dataTest = modifiedUser.data;
					setUser({...user, ...dataTest});
				} catch (error) {
					throw new Error (error)
				}
			} else {
				dispatch({
					type:ERROR,
					payload: {error: "Le format de votre adresse mail est invalide" }
				})
			}
		} else {
			dispatch({
				type:ERROR,
				payload: {error: "Votre confirmation n'est pas identique à votre email." }
			})
		}
	}

	/* if( event.target.name === "formPassword"){
		if(state.password === state.confirmPassword){
			if(!isValidPassword(state.password)){
				dispatch({
					type:ERROR,
					payload: { error: "Votre mot de passe doit contenir au moins 10 caractères, une majuscule, un caractère spécial et un chiffre." }
				});
				return
			}
			try {
				console.log("hash", formDataPassword.newPassword)
				await api.post(`/users/password`, formDataPassword);
			} catch (error) {
				throw new Error (error);
			};
		} else {
			dispatch({
				type:ERROR,
				payload: {error: "Votre confirmation n'est pas identique à votre password" }
			})
		}
	} */
}

const handleChange = (event) => {
	event.preventDefault();
	dispatch(actionModifyProfile(event.target.name, event.target.value))
}

const handleClick = async () => {
	await api.delete(`/users/${user.id}`); {/* Envoi au serveur la demande de suppression de compte*/} 
}


  

  return (   

	<Modal className='modify-profile-modal'
	  closeIcon
	  open={open}
	  trigger={ toDelete? <Button>Supprimer votre compte</Button> : <Button>Modifier</Button>}
	  onClose={() => setOpen(false)}
	  onOpen={() => setOpen(true)}
	>
	  <Header content = {`${data}`} />
	  <Modal.Content>
	   {toDelete? 
	   <div className='confirmDeleteButton'>
		<Button onClick={() => setOpen(false)} >Non</Button>
		<Button onClick={handleClick}>Oui</Button>
		</div>
		:
		<div className='modifyForm'>
			{!isPassword? 
				<Form onSubmit={handleSubmit} name="formProfile">
					<Form.Field>
						<label>Votre Pseudo</label>
						<input name="pseudo" value={state.pseudo} onChange={handleChange}/>
					</Form.Field>
					<Form.Field>
						<label>Votre Prénom</label>
						<input name="firstName" value={state.firstName} onChange={handleChange}/>
					</Form.Field>
					<Form.Field>
						<label>Votre Nom</label>
						<input name="lastName" value={state.lastName} onChange={handleChange}/>
					</Form.Field>
					<Form.Field>
						<label>Votre nouvel Email</label>
						<input type="email" name="email" value={state.email} onChange={handleChange}/>
					</Form.Field>
					<Form.Field>
						<label>Confirmez votre Email</label>
						<input type="email" name="confirmEmail" value={state.confirmEmail} onChange={handleChange}/>
					</Form.Field>					
					<Button type='submit'>Submit</Button>
					{state.error && <p>{state.error}</p>}
				</Form>			
			:
				<Form onSubmit={handleSubmit} name="formPassword">
					<Form.Field>
						<label>Votre nouveau Password</label>
						<input name="password" value={state.password} onChange={handleChange}/>
					</Form.Field>
					<Form.Field>
						<label>Confirmez votre Password</label>
						<input name="confirmPassword" value={state.confirmPassword} onChange={handleChange}/>
					</Form.Field>
					<Button type='submit'>Submit</Button>
					{state.error && <p>{state.error}</p>}
				</Form>}
		</div>}
	  </Modal.Content>      
	</Modal>
  )
}


export default ModifyProfileModal