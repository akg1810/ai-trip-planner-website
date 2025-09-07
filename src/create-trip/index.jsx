import { Input } from "../components/ui/input";
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { SelectBudgetOptions, SelectTravelList, AI_PROMPT} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner" 
import { chatSession } from "../service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "../service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFormData]=useState([]);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const handleInputChange=(name, value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }
  const onGenerateTrip=async()=>{

    const user = localStorage.getItem("user");
    if(!user)
    {
      setOpenDialogue(true);
      return;
    }
    if(formData?.noOfDays>5&&!formData?.location||!formData?.budget||!formData?.traveler)
    {
      toast("Please fill all details and trip duration should be less than 6 days.")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    const text = result?.response?.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    let tripJson;
    try {
      tripJson = JSON.parse(cleaned);
    } catch (e) {
      console.error("Parsing error:", e, cleaned);
      return;
    }
    saveAiTrip(tripJson);
  }

  const saveAiTrip=async(TripData)=>{
    setLoading(true);
    try{
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    
    // Add a new document in collection "cities"
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection:formData,
      tripData:TripData,
      userEmail:user?.email,
      id:docId
    });
    console.log("✅ Trip saved!");
    navigate('/view-trip/'+docId);
  } catch (err) {
    console.error("❌ Error saving trip:", err);
  } finally {
    setLoading(false);
  }
  }

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>getUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const getUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialogue(false);
      onGenerateTrip();
    })
  }

  useEffect(()=>{
    console.log(formData);
  },[formData])

  return (
    <div className='sm:px-5 md:px-32 lg:px-40 px-50 mt-10 flex flex-col' >
      
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'> Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
          <GooglePlacesAutocomplete 
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v); handleInputChange('location', v)}
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex: 3'} type="number" onChange={(e)=>handleInputChange('noOfDays', e.target.value)}/>
        </div>
      </div>

      <div className="mt-15">
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} onClick={()=>handleInputChange('budget', item.title)} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-15">
        <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList .map((item,index)=>(
            <div key={index} onClick={()=>handleInputChange('traveler', item.people)} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler==item.people&&'shadow-lg border-black'}`}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-20 justify-end flex">
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading?<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/>:'Generate Trip'}
        </Button>
      </div>
      <Dialog open={openDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign In to the App with Google Authentication securely</p>
              <Button onClick={login}
                className="w-full mt-5 flex gap-4 items-center">
                  
                  <FcGoogle className="h-7 w-7" /> 
                  Sign In with Google
                  
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip
