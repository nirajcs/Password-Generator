import React, { useEffect, useState } from 'react'
import { BsClipboardFill,BsTrashFill } from 'react-icons/bs'
import { LiaEyeSolid,LiaEyeSlash } from 'react-icons/lia'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../utils/useForm'
import { getRandomChar, getSpecialChar } from '../utils/utils'
import { toast } from 'react-toastify'
import { useDeletePasswordMutation, useSavePasswordMutation } from '../slices/usersApiSlice'
import { usersApi } from '../axiosApi/axiosInstance'

const Generator = () => {

    const navigate = useNavigate()
    const { userInfo } = useSelector((state)=>state.auth)

    const [result, setResult] = useState('');
    const [collection,setCollection] = useState([]);
    const [visible,setVisible] = useState('')

    const [action,setAction] = useState(false)

    const [values,setValues] = useForm({
        length:5,
        capital:true,
        small:true,
        number:true,
        special:true
    })

    const fieldsArray = [
        {
            field:values.capital,
            getChar:()=>getRandomChar(65, 90)
        },
        {
            field:values.small,
            getChar:()=>getRandomChar(97, 122)
        },
        {
            field:values.number,
            getChar:()=>getRandomChar(48, 57)
        },
        {
            field:values.special,
            getChar:()=>getSpecialChar()
        }
    ]

    const handleSubmit = (e)=>{
        e.preventDefault()
        let generatedPassword = ''
        const checkedFields = fieldsArray.filter(({ field }) => field);

        for(let i=0; i<values.length; i++){
            const index = Math.floor(Math.random() * checkedFields.length);
            const letter = checkedFields[index]?.getChar();
            if (letter) {
                generatedPassword += letter;
            }
        }

        if (generatedPassword) {
            setResult(generatedPassword);
        } else {
            toast.error(' Please select at least one option');
        }
    }

    const handleClipboard = async()=>{
        if (result) {
            await navigator.clipboard.writeText(result);
            toast.success('Copied to your clipboard');
        } else {
            toast.error('No password to copy');
        }
    }

    const [savePassword] = useSavePasswordMutation()

    const saveHandler = async()=>{
        try {
            let res = await savePassword({result}).unwrap()
            if(res){
                toast.success("Password Saved Successfully")
                setResult('')
                setAction(!action)
            }
        } catch (error) {
            toast.error(error?.data.message);
        }
    }

    const [deletePassword] = useDeletePasswordMutation()

    const deleteHandler = async(id)=>{
        try {
            let res = await deletePassword({saved:id}).unwrap()
            if(res){
                toast.success("Password Deleted Successfully")
                setAction(!action)
            }
        } catch (error) {
            toast.error(error?.data.message);
        }
    }

    useEffect(()=>{
        if(!userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    useEffect(()=>{
        try {
            const fetchCollection = async()=>{
                let res = await usersApi.get(`/get-saved/${userInfo._id}`)
                console.log(res.data)
                setCollection(res.data)
            }
            if(userInfo){
                fetchCollection();
            }
        } catch (error) {
            console.log(error.data);
        }
    },[action])

  return (
    <div className='h-5/6 flex flex-col bg-secondaryColor justify-between'>
        <div className='h-full flex justify-between'>
            <div className='h-full w-1/2 flex justify-center items-center'>
                <div className='bg-primaryColor w-3/6 p-5 rounded-lg'>
                    <div className='w-full h-8 flex'>
                        <input type="text" value={result} className='h-full p-3 w-5/6 rounded-tl rounded-bl focus:outline-none' readOnly/>
                        <div onClick={handleClipboard} className='bg-secondaryColor cursor-pointer flex justify-center items-center p-2 w-1/6 rounded-tr rounded-br'>
                            <BsClipboardFill className='text-xl text-primaryColor'/>
                        </div>
                    </div>
                    {
                        result ? (
                            <button onClick={saveHandler} className='bg-secondaryColor hover:bg-quaternaryColor w-full mt-3 p-1 rounded-lg text-primaryColor font-medium'>Save Password</button>
                        ):null
                    }
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-between my-6'>
                            <h1 className='text-white font-medium'>Length (5-15)</h1>
                            <input type="number" value={values.length} onChange={setValues} name="length" min={5} max={15} className='w-1/6'/>
                        </div>
                        <div className='flex justify-between my-6'>
                            <h1 className='text-white font-medium'>Capital Letters</h1>
                            <input type="checkbox" checked={values.capital} onChange={setValues} name="capital" className='w-5 h-5' />
                        </div>
                        <div className='flex justify-between my-6'>
                            <h1 className='text-white font-medium'>Small Letters</h1>
                            <input type="checkbox" checked={values.small} onChange={setValues} name="small" className='w-5 h-5' />
                        </div>
                        <div className='flex justify-between my-6'>
                            <h1 className='text-white font-medium'>Numbers</h1>
                            <input type="checkbox" checked={values.number} onChange={setValues} name="number" className='w-5 h-5' />
                        </div>
                        <div className='flex justify-between my-6'>
                            <h1 className='text-white font-medium'>Special Characters</h1>
                            <input type="checkbox" checked={values.special} onChange={setValues} name="special" className='w-5 h-5' />
                        </div>
                        <div className='my-2 w-full'>
                            <button type="submit" className='bg-secondaryColor hover:bg-quaternaryColor w-full p-2 rounded-lg text-primaryColor font-medium'>Generate Password</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='h-5/6 w-1/2 bg-primaryColor mt-10 mx-5 rounded-lg'>
                <div className='px-3 flex items-center h-1/6'>
                    <h1 className='text-white font-bold text-xl tracking-widest'>Saved Passwords</h1>
                </div>
                <div className='overflow-y-auto h-5/6'>
                    {
                        collection.length > 0 ? (
                            collection.map((password) => (
                                <div key={password._id} className='bg-secondaryColor m-3 p-3 rounded flex justify-between'>
                                    {visible === password._id ? (
                                        <h1>{password.saved || ''}</h1>
                                    ) : (
                                        <h1>{'*'.repeat(password.saved?.length || 0)}</h1>
                                    )}
                                    <div className='flex'>
                                        {visible === password._id ? (
                                            <LiaEyeSolid
                                                onMouseUp={() => setVisible('')}
                                                onMouseLeave={() => setVisible('')}
                                                className='text-2xl mx-1 cursor-pointer text-primaryColor'
                                            />
                                        ) : (
                                            <LiaEyeSlash
                                                onMouseDown={() => setVisible(password._id)}
                                                className='text-2xl mx-1 cursor-pointer text-primaryColor'
                                            />
                                        )}
                                        <BsTrashFill onClick={()=>deleteHandler(password._id)} className='text-2xl mx-1 cursor-pointer text-primaryColor' />
                                    </div>
                                </div>
                            ))
                        ) : <div className='w-full h-full flex justify-center items-center'><h1 className='text-secondaryColor font-bold'>No Saved Passwords</h1></div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Generator