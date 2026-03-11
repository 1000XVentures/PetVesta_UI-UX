import { useState, useEffect, useRef } from "react"
import { MapPin, Search, Star, Check, X, Plus, Minus, User, Home, BookOpen, MessageCircle, ArrowLeft, Shield, Clock, Camera, CreditCard, Smartphone, Building2, Wallet, CheckCircle, ChevronDown, Edit2, Heart, Navigation, Bell, ChevronRight, RefreshCw, Lock, Filter, Circle, PhoneCall, Activity, Repeat2, Award } from "lucide-react"

// ─── Design Tokens ────────────────────────────────────────────────────────────
const P   = "#F26419"
const PD  = "#C94F0F"
const PL  = "#FEF0E8"
const BG  = "#FAF7F3"
const SUR = "#FFFFFF"
const S2  = "#F5F1EC"
const TX  = "#1C1917"
const T2  = "#78716C"
const T3  = "#A8A29E"
const BD  = "#EDE8E3"
const GN  = "#15803D"
const GL  = "#F0FDF4"
const ERR = "#DC2626"

// ─── Mock Data ────────────────────────────────────────────────────────────────
const SITTERS = [
  { id:1, name:"Priya Sharma", initials:"PS", color:"#E8D9C4", verified:true, distance:"1.2", responseTime:"5 min", rating:4.9, reviews:87, tags:["Cat specialist","Has garden"], price:899, bio:"Vet tech with 5 years of professional pet care. Every pet gets the same love and attention as my own.", rebooked:34, services:{sitting:899, walking:399, dropin:299, daycare:599}, home:"2BHK Apartment", outdoor:true, otherPets:"1 cat", children:false },
  { id:2, name:"Arjun Reddy",   initials:"AR", color:"#C8D8E8", verified:true, distance:"2.8", responseTime:"15 min", rating:4.7, reviews:52, tags:["Dog specialist","Repeat sitter"], price:799, bio:"Passionate dog lover with a spacious home and garden. Your dog will have the time of their life.", rebooked:21, services:{sitting:799, walking:349, dropin:249, daycare:549}, home:"Independent Villa", outdoor:true, otherPets:"None", children:false },
  { id:3, name:"Meera Krishnan",initials:"MK", color:"#D4C8E8", verified:true, distance:"3.5", responseTime:"10 min", rating:4.8, reviews:63, tags:["Vet tech","Special needs"],   price:999, bio:"Certified vet technician. Specialized in senior pets and animals with medical needs.", rebooked:28, services:{sitting:999, walking:449, dropin:349, daycare:699}, home:"3BHK Apartment", outdoor:false, otherPets:"None", children:false },
  { id:4, name:"Rahul Mehta",   initials:"RM", color:"#C8E4D4", verified:true, distance:"4.1", responseTime:"20 min", rating:4.6, reviews:38, tags:["Budget friendly","Dog walker"], price:699, bio:"Reliable, caring, and affordable. Your pet is always in safe, experienced hands.", rebooked:15, services:{sitting:699, walking:299, dropin:199, daycare:449}, home:"2BHK Apartment", outdoor:false, otherPets:"1 dog", children:true },
]

const ADDONS = [
  { id:1, name:"Garden / Outdoor play", price:100, per:"night" },
  { id:2, name:"Extra cuddle time",      price:150, per:"night" },
  { id:3, name:"Basic grooming",         price:400, per:"session" },
  { id:4, name:"Training session",       price:500, per:"session" },
]

const DOG_SITTER_SVC  = [{ id:"sitting",  label:"Pet Sitting",    desc:"Sitter comes to your home" }, { id:"boarding", label:"Pet Boarding",   desc:"Pet stays at sitter's home" }, { id:"walking",  label:"Dog Walking",    desc:"Scheduled walks" }, { id:"dropin",   label:"Drop-in Visits", desc:"30-min check-ins" }, { id:"daycare",  label:"Day Care",       desc:"Daytime only" }]
const CAT_SITTER_SVC  = [{ id:"sitting",  label:"Pet Sitting",    desc:"Sitter comes to your home" }, { id:"boarding", label:"Pet Boarding",   desc:"Pet stays at sitter's home" }, { id:"dropin",   label:"Drop-in Visits", desc:"30-min check-ins" }, { id:"daycare",  label:"Day Care",       desc:"Daytime only" }]
const BOARDING_SVC    = [{ id:"kennel",    label:"Kennel Boarding",    desc:"Dedicated dog facility" }, { id:"cattery",  label:"Cattery Boarding",   desc:"Cat-only facility" }, { id:"hotel",    label:"Luxury Pet Hotel",    desc:"Premium suites" }, { id:"dayboard", label:"Day Boarding",       desc:"Daytime facility care" }, { id:"boardtrain",label:"Board & Train",       desc:"Training during stay" }]
const DOG_BREEDS      = ["Labrador","Golden Retriever","German Shepherd","Beagle","Pug","Indie","Shih Tzu","Rottweiler","Husky","Cocker Spaniel"]
const CAT_BREEDS      = ["Persian","Siamese","Bengal","Maine Coon","Ragdoll","British Shorthair","Indie"]

const SAVED_PETS = [
  { id:1, name:"Bruno",  species:"dog", breed:"Labrador",      size:"Large",  age:"Adult",  gender:"Male",   neutered:"Yes", vaccination:"Uploaded", needs:["None"],   temperament:"Friendly", color:"#E8D9C4" },
  { id:2, name:"Luna",   species:"cat", breed:"Persian",       size:"Small",  age:"Adult",  gender:"Female", neutered:"Yes", vaccination:"Uploaded", needs:["Anxiety"]},
]

const TIMELINE = [
  { time:"8:00 AM", type:"meal",   label:"Breakfast", note:"Ate all food enthusiastically" },
  { time:"10:00 AM",type:"walk",   label:"Morning Walk", note:"1.2 km walk at the park" },
  { time:"12:00 PM",type:"sleep",  label:"Nap Time", note:"Resting on favourite bed" },
  { time:"2:00 PM", type:"photo",  label:"Photo Update", note:"Looking happy and relaxed" },
  { time:"3:30 PM", type:"play",   label:"Playtime", note:"Fetch session in the garden" },
]

const MOCK_BOOKING_CHATS = {
  1: [
    { from:"sitter", time:"9:05 AM", text:"Good morning! I’ve just arrived and Bruno is super excited 🐕" },
    { from:"user",   time:"9:07 AM", text:"Amazing, thank you for the update 🙌" },
    { from:"sitter", time:"11:32 AM",text:"We finished our morning walk (1.5 km). Sharing some photos now." },
    { from:"sitter", time:"3:10 PM", text:"Bruno just had his meal and is now napping on his favourite spot." },
  ],
  2: [
    { from:"sitter", time:"Yesterday", text:"Luna has settled in well and is eating normally." },
    { from:"user",   time:"Yesterday", text:"So glad to hear that, thank you!" },
    { from:"sitter", time:"Today",     text:"Dropping Luna home in 20 mins. Everything went smoothly." },
  ],
}

// ─── Shared Components ────────────────────────────────────────────────────────

function Btn({ label, onClick, variant="primary", disabled=false, full=true, small=false }) {
  const base = { fontFamily:"inherit", fontSize:small?13:15, fontWeight:600, border:"none", cursor:disabled?"not-allowed":"pointer", borderRadius:14, transition:"all 0.15s", opacity:disabled?0.5:1, width:full?"100%":"auto", padding:small?"10px 20px":"15px 24px" }
  const variants = { primary:{ background:disabled?T3:P, color:"#fff" }, secondary:{ background:S2, color:TX }, outline:{ background:"transparent", border:`1.5px solid ${BD}`, color:TX }, ghost:{ background:"transparent", color:P }, dark:{ background:TX, color:"#fff" } }
  return <button style={{...base, ...variants[variant]}} onClick={disabled?undefined:onClick}>{label}</button>
}

function StatusBar({ light=false }) {
  const c = light ? "#fff" : TX
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 28px 0", height:44 }}>
      <span style={{ fontSize:15, fontWeight:700, color:c, letterSpacing:-0.3 }}>9:41</span>
      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
        <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7.5" width="3" height="3.5" fill={c} rx="0.5"/><rect x="4.5" y="4.5" width="3" height="6.5" fill={c} rx="0.5"/><rect x="9" y="1.5" width="3" height="9.5" fill={c} rx="0.5"/><rect x="13.5" y="0" width="2.5" height="11" fill={c} opacity="0.3" rx="0.5"/></svg>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none"><rect x="0.5" y="0.5" width="14" height="10" rx="2.5" stroke={c}/><rect x="2" y="2" width="9" height="7" fill={c} rx="1.5"/><path d="M15.5 3.5v4a2 2 0 000-4z" fill={c}/></svg>
      </div>
    </div>
  )
}

function TopBar({ title, onBack, rightEl, transparent=false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 20px 12px", background: transparent?"transparent":SUR }}>
      {onBack ? <button onClick={onBack} style={{ width:36, height:36, borderRadius:12, background:S2, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><ArrowLeft size={18} color={TX}/></button> : <div style={{width:36}}/>}
      {title && <span style={{ fontSize:16, fontWeight:700, color:TX, letterSpacing:-0.2 }}>{title}</span>}
      {rightEl || <div style={{width:36}}/>}
    </div>
  )
}

function BottomNav({ active, go }) {
  const tabs = [
    { id:"home",     label:"Home",     Icon:Home },
    { id:"search",   label:"Search",   Icon:Search },
    { id:"bookings", label:"Bookings", Icon:BookOpen },
    { id:"messages", label:"Messages", Icon:MessageCircle },
    { id:"profile",  label:"Profile",  Icon:User },
  ]
  return (
    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:72, background:SUR, borderTop:`1px solid ${BD}`, display:"flex", alignItems:"flex-start", paddingTop:10 }}>
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => {
              if (id === "home") go("home")
              else if (id === "search") go("search")
              else if (id === "bookings") go("bookings")
              else if (id === "messages") go("messages")
              else if (id === "profile") go("profile")
            }}
            style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, border:"none", background:"transparent", cursor:"pointer", padding:0 }}
          >
            <Icon size={22} color={isActive ? P : T3} strokeWidth={isActive ? 2.5 : 2}/>
            <span style={{ fontSize:10, fontWeight:isActive?700:400, color:isActive?P:T3 }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function Avatar({ initials, color, size=44 }) {
  return <div style={{ width:size, height:size, borderRadius:size/2, background:color||S2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontSize:size*0.33, fontWeight:700, color:TX }}>{initials}</span></div>
}

function Chip({ label, active, onClick }) {
  return <button onClick={onClick} style={{ padding:"8px 16px", borderRadius:100, border:`1.5px solid ${active?P:BD}`, background:active?P:SUR, color:active?"#fff":TX, fontSize:13, fontWeight:active?600:400, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>{label}</button>
}

function Tag({ label }) {
  return <span style={{ fontSize:11, padding:"4px 10px", background:S2, borderRadius:100, color:T2, fontWeight:500 }}>{label}</span>
}

function SitterCard({ sitter, onClick, compact=false }) {
  return (
    <div onClick={onClick} style={{ background:SUR, borderRadius:18, padding:compact?14:16, marginBottom:12, boxShadow:"0 2px 16px rgba(0,0,0,0.05)", cursor:"pointer", display:"flex", gap:14 }}>
      <div style={{ position:"relative", flexShrink:0 }}>
        <Avatar initials={sitter.initials} color={sitter.color} size={compact?48:56}/>
        {sitter.verified && <div style={{ position:"absolute", bottom:-2, right:-2, width:16, height:16, background:GN, borderRadius:8, border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={9} color="#fff" strokeWidth={3}/></div>}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <p style={{ fontWeight:700, fontSize:15, color:TX, margin:0 }}>{sitter.name}</p>
            <p style={{ fontSize:12, color:T2, margin:"2px 0 0" }}>{sitter.distance} km · Responds in {sitter.responseTime}</p>
          </div>
          <div style={{ textAlign:"right", flexShrink:0 }}>
            <p style={{ fontWeight:700, fontSize:17, color:P, margin:0 }}>₹{sitter.price}</p>
            <p style={{ fontSize:11, color:T3, margin:0 }}>/night</p>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:6 }}>
          <Star size={13} color="#F59E0B" fill="#F59E0B"/>
          <span style={{ fontSize:13, fontWeight:600, color:TX }}>{sitter.rating}</span>
          <span style={{ fontSize:12, color:T2 }}>· {sitter.reviews} reviews</span>
        </div>
        <div style={{ display:"flex", gap:6, marginTop:7, flexWrap:"wrap" }}>
          {sitter.tags.map(t => <Tag key={t} label={t}/>)}
        </div>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, placeholder, type="text", maxLength }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 6px" }}>{label}</p>}
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type} maxLength={maxLength}
        style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:15, color:TX, background:SUR, fontFamily:"inherit", boxSizing:"border-box", outline:"none" }}/>
    </div>
  )
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 6px" }}>{label}</p>}
      <div style={{ position:"relative" }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:15, color:TX, background:SUR, fontFamily:"inherit", appearance:"none", outline:"none" }}>
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} color={T2} style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
      </div>
    </div>
  )
}

function PillGroup({ label, options, value, onChange, multi=false }) {
  return (
    <div style={{ marginBottom:16 }}>
      {label && <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 8px" }}>{label}</p>}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {options.map(o => {
          const isActive = multi ? (value||[]).includes(o) : value === o
          return (
            <button key={o} onClick={() => {
              if(multi) { const cur=value||[]; onChange(isActive?cur.filter(x=>x!==o):[...cur,o]) }
              else onChange(isActive?"":o)
            }} style={{ padding:"8px 16px", borderRadius:100, border:`1.5px solid ${isActive?P:BD}`, background:isActive?P:SUR, color:isActive?"#fff":TX, fontSize:13, fontWeight:isActive?600:400, cursor:"pointer", fontFamily:"inherit" }}>{o}</button>
          )
        })}
      </div>
    </div>
  )
}

function SectionHeader({ title, onViewAll }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
      <h2 style={{ fontSize:18, fontWeight:700, color:TX, margin:0 }}>{title}</h2>
      {onViewAll && <button onClick={onViewAll} style={{ fontSize:13, color:P, fontWeight:600, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit" }}>View All</button>}
    </div>
  )
}

function Divider({ my=16 }) { return <div style={{ height:1, background:BD, margin:`${my}px 0` }}/> }

// ─── SCREENS ──────────────────────────────────────────────────────────────────

function SplashScreen({ go }) {
  useEffect(() => { const t = setTimeout(() => go("auth"), 2500); return () => clearTimeout(t) }, [])
  return (
    <div style={{ height:"100%", background:`linear-gradient(160deg, #1C1917 0%, #2D1810 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 30% 20%, rgba(242,100,25,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(242,100,25,0.08) 0%, transparent 60%)" }}/>
      <div style={{ textAlign:"center", position:"relative" }}>
        <div style={{ width:72, height:72, background:PL, borderRadius:22, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 32px rgba(242,100,25,0.3)" }}>
          <svg viewBox="0 0 40 40" width="40" height="40">
            <ellipse cx="10" cy="10" rx="5" ry="7" fill={P} transform="rotate(-30 10 10)"/>
            <ellipse cx="30" cy="10" rx="5" ry="7" fill={P} transform="rotate(30 30 10)"/>
            <ellipse cx="5" cy="24" rx="4.5" ry="6.5" fill={P} transform="rotate(-10 5 24)"/>
            <ellipse cx="35" cy="24" rx="4.5" ry="6.5" fill={P} transform="rotate(10 35 24)"/>
            <ellipse cx="20" cy="29" rx="12" ry="9" fill={P}/>
          </svg>
        </div>
        <h1 style={{ fontSize:36, fontWeight:800, color:"#fff", margin:"0 0 8px", letterSpacing:-0.5 }}>PetVesta</h1>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.55)", margin:0, fontWeight:400 }}>Your pet's second home</p>
      </div>
      <div style={{ position:"absolute", bottom:48, display:"flex", gap:6 }}>
        <div style={{ width:32, height:3, borderRadius:2, background:P }}/>
        <div style={{ width:8, height:3, borderRadius:2, background:"rgba(255,255,255,0.2)" }}/>
        <div style={{ width:8, height:3, borderRadius:2, background:"rgba(255,255,255,0.2)" }}/>
      </div>
    </div>
  )
}

function AuthScreen({ go, state, set }) {
  const { userType } = state

  const chooseNew = () => {
    set("userType","new")
    set("userName","")
    set("userPets", [])
    set("selectedPet", null)
    set("bookings", [])
    go("home")
  }

  const chooseExisting = () => {
    set("userType","existing")
    set("userName","Shruti")
    set("userPets", SAVED_PETS)
    set("selectedPet", SAVED_PETS[0])
    // Two sample past bookings for demo
    set("bookings", [
      {
        id: 1,
        sitterId: 1,
        petId: 1,
        startDate: "2024-11-01",
        endDate: "2024-11-03",
        total: 4999,
        status: "needs_review", // service completed, review pending
        tag: "Pending review",
      },
      {
        id: 2,
        sitterId: 2,
        petId: 2,
        startDate: "2024-09-10",
        endDate: "2024-09-12",
        total: 3999,
        status: "completed", // fully completed with review
        tag: "Completed",
      },
    ])
    go("home")
  }

  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <StatusBar/>
      <div style={{ flex:1, overflowY:"auto", padding:"32px 24px 32px" }}>
        <div style={{ marginBottom:24 }}>
          <div style={{ width:40, height:40, background:PL, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
            <svg viewBox="0 0 24 24" width="22" height="22"><ellipse cx="6" cy="6" rx="3" ry="4.2" fill={P} transform="rotate(-30 6 6)"/><ellipse cx="18" cy="6" rx="3" ry="4.2" fill={P} transform="rotate(30 18 6)"/><ellipse cx="3" cy="14.5" rx="2.7" ry="3.9" fill={P} transform="rotate(-10 3 14.5)"/><ellipse cx="21" cy="14.5" rx="2.7" ry="3.9" fill={P} transform="rotate(10 21 14.5)"/><ellipse cx="12" cy="17.5" rx="7.2" ry="5.4" fill={P}/></svg>
          </div>
          <h1 style={{ fontSize:28, fontWeight:800, color:TX, margin:"0 0 6px", letterSpacing:-0.5 }}>Welcome to PetVesta</h1>
          <p style={{ fontSize:15, color:T2, margin:0 }}>Trusted pet care, right at your doorstep</p>
        </div>

        <div style={{ marginBottom:24 }}>
          <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 8px" }}>Choose how to experience the app</p>
          <div style={{ display:"flex", gap:10 }}>
            <button
              onClick={chooseNew}
              style={{
                flex:1,
                padding:"12px 14px",
                borderRadius:14,
                border:`2px solid ${userType==="new"?P:BD}`,
                background:userType==="new"?PL:SUR,
                cursor:"pointer",
                fontFamily:"inherit",
                textAlign:"left",
              }}
            >
              <p style={{ fontSize:14, fontWeight:700, color:userType==="new"?P:TX, margin:"0 0 2px" }}>I’m new to PetVesta</p>
              <p style={{ fontSize:12, color:T2, margin:0 }}>Create a fresh account</p>
            </button>
            <button
              onClick={chooseExisting}
              style={{
                flex:1,
                padding:"12px 14px",
                borderRadius:14,
                border:`2px solid ${userType==="existing"?P:BD}`,
                background:userType==="existing"?PL:SUR,
                cursor:"pointer",
                fontFamily:"inherit",
                textAlign:"left",
              }}
            >
              <p style={{ fontSize:14, fontWeight:700, color:userType==="existing"?P:TX, margin:"0 0 2px" }}>I already use PetVesta</p>
              <p style={{ fontSize:12, color:T2, margin:0 }}>Log in to your account</p>
            </button>
          </div>
        </div>
        <p style={{ fontSize:12, color:T3, textAlign:"center", marginTop:24, lineHeight:1.6 }}>
          This is a demo build with static data.<br/>
          Pick an option above to explore the full booking flow.
        </p>
      </div>
    </div>
  )
}

function LocationModal({ onConfirm }) {
  const [query, setQuery] = useState("")
  const cities = ["Koramangala, Bengaluru", "Indiranagar, Bengaluru", "Bandra, Mumbai", "Powai, Mumbai", "Hitech City, Hyderabad", "T Nagar, Chennai"]
  const filtered = cities.filter(c => !query || c.toLowerCase().includes(query.toLowerCase()))
  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(28,25,23,0.6)", zIndex:100, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div style={{ background:SUR, borderRadius:"24px 24px 0 0", padding:"8px 0 32px" }}>
        <div style={{ width:36, height:4, background:BD, borderRadius:2, margin:"8px auto 20px" }}/>
        <div style={{ padding:"0 24px" }}>
          <h2 style={{ fontSize:22, fontWeight:800, color:TX, margin:"0 0 4px" }}>Set your location</h2>
          <p style={{ fontSize:14, color:T2, margin:"0 0 20px" }}>So we can find sitters near you</p>
          <button onClick={() => onConfirm("Koramangala, Bengaluru")} style={{ width:"100%", padding:"14px 20px", borderRadius:14, border:`1.5px solid ${BD}`, background:PL, display:"flex", alignItems:"center", gap:12, cursor:"pointer", marginBottom:16, fontFamily:"inherit" }}>
            <Navigation size={18} color={P}/>
            <span style={{ fontSize:14, fontWeight:600, color:P }}>Use my current location</span>
          </button>
          <div style={{ position:"relative", marginBottom:16 }}>
            <Search size={16} color={T3} style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)" }}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search area, city..." style={{ width:"100%", padding:"13px 16px 13px 44px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}/>
          </div>
          <div style={{ maxHeight:200, overflowY:"auto" }}>
            {filtered.map(city => (
              <button key={city} onClick={() => onConfirm(city)} style={{ width:"100%", padding:"14px 0", borderBottom:`1px solid ${BD}`, display:"flex", alignItems:"center", gap:12, background:"none", border:"none", borderBottom:`1px solid ${BD}`, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                <MapPin size={16} color={T3}/>
                <span style={{ fontSize:14, color:TX }}>{city}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeScreen({ go, state, set }) {
  const { location, showLocationModal, userName, userType, userPets } = state
  const displayName = userName || (userType === "existing" ? "Shruti" : "there")
  const pets = userPets || []
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column", position:"relative" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <div style={{ padding:"4px 20px 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <p style={{ fontSize:13, color:T2, margin:"0 0 2px" }}>Good morning</p>
            <h1 style={{ fontSize:22, fontWeight:800, color:TX, margin:0, letterSpacing:-0.3 }}>Hello, {displayName}</h1>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button
              onClick={()=>window.alert("Notifications will appear here in a future version.")}
              style={{ width:38, height:38, borderRadius:12, background:S2, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
            >
              <Bell size={18} color={TX}/>
            </button>
            <div style={{ width:38, height:38, borderRadius:12, background:"#E8D9C4", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:15, fontWeight:700, color:TX }}>S</span></div>
          </div>
        </div>
        <button onClick={() => set("showLocationModal", true)} style={{ margin:"0 20px 16px", padding:"12px 16px", background:S2, borderRadius:12, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10, width:"calc(100% - 40px)", fontFamily:"inherit" }}>
          <MapPin size={16} color={P}/>
          <span style={{ fontSize:14, fontWeight:500, color:TX, flex:1, textAlign:"left" }}>{location || "Set location"}</span>
          <ChevronDown size={16} color={T3}/>
        </button>
        <div style={{ padding:"0 20px 16px", position:"relative" }}>
          <Search size={16} color={T3} style={{ position:"absolute", left:36, top:"50%", transform:"translateY(-50%)" }}/>
          <input placeholder="Search sitters, services..." style={{ width:"100%", padding:"13px 16px 13px 44px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box", background:BG }}/>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", paddingBottom:80 }}>
        {/* Hero Banner */}
        <div style={{ margin:"16px 20px", background:`linear-gradient(135deg, #1C1917 0%, #2D1810 100%)`, borderRadius:20, padding:"20px 20px 0", overflow:"hidden", position:"relative", minHeight:120 }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 50%, rgba(242,100,25,0.3) 0%, transparent 60%)" }}/>
          <div style={{ position:"relative" }}>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", margin:"0 0 4px" }}>This weekend</p>
            <h3 style={{ fontSize:20, fontWeight:800, color:"#fff", margin:"0 0 12px", letterSpacing:-0.3 }}>Find verified sitters<br/>near you</h3>
            <button onClick={() => go("service-select")} style={{ padding:"9px 18px", background:P, color:"#fff", borderRadius:100, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Book now</button>
          </div>
          <div style={{ position:"absolute", right:-10, bottom:-10, width:100, height:100, background:"rgba(242,100,25,0.1)", borderRadius:50 }}/>
        </div>

        {/* Quick Services */}
        <div style={{ padding:"20px 20px 8px" }}>
          <SectionHeader title="Services" onViewAll={()=>go("service-select")}/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[{ label:"Find a Sitter", desc:"Home visits & boarding", type:"sitter" }, { label:"Find Boarding", desc:"Kennels & pet hotels", type:"boarding" }, { label:"Dog Walking", desc:"Daily scheduled walks", type:"sitter" }, { label:"Drop-in Visits", desc:"Quick 30-min check-ins", type:"sitter" }].map(s => (
              <button key={s.label} onClick={() => { set("serviceType", s.type); go("service-select") }} style={{ background:SUR, borderRadius:16, padding:"16px 14px", border:`1.5px solid ${BD}`, cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
                <div style={{ width:36, height:36, borderRadius:10, background:PL, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
                  <svg viewBox="0 0 24 24" width="20" height="20"><ellipse cx="6" cy="5.5" rx="2.5" ry="3.5" fill={P} transform="rotate(-30 6 5.5)"/><ellipse cx="18" cy="5.5" rx="2.5" ry="3.5" fill={P} transform="rotate(30 18 5.5)"/><ellipse cx="3" cy="13" rx="2.2" ry="3.2" fill={P} transform="rotate(-10 3 13)"/><ellipse cx="21" cy="13" rx="2.2" ry="3.2" fill={P} transform="rotate(10 21 13)"/><ellipse cx="12" cy="16.5" rx="6" ry="4.5" fill={P}/></svg>
                </div>
                <p style={{ fontSize:13, fontWeight:700, color:TX, margin:"0 0 3px" }}>{s.label}</p>
                <p style={{ fontSize:11, color:T2, margin:0 }}>{s.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Your Pets */}
        <div style={{ padding:"20px 20px 0" }}>
          <SectionHeader title="Your Pets"/>
          <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:8 }}>
            {pets.length === 0 ? (
              <div style={{ flexShrink:0, padding:"10px 0", paddingRight:8 }}>
                <p style={{ fontSize:13, color:T2, margin:"0 0 4px" }}>No pets added yet</p>
                <p style={{ fontSize:12, color:T3, margin:0 }}>Tap "Add pet" to get started.</p>
              </div>
            ) : (
              pets.map(pet => (
                <div key={pet.id} style={{ flexShrink:0, textAlign:"center" }}>
                  <div style={{ width:64, height:64, borderRadius:20, background:pet.color||S2, display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${BD}`, marginBottom:6 }}>
                    <span style={{ fontSize:24 }}>{pet.species==="dog"?"🐕":"🐈"}</span>
                  </div>
                  <p style={{ fontSize:12, fontWeight:600, color:TX, margin:0 }}>{pet.name}</p>
                  <p style={{ fontSize:10, color:T2, margin:0 }}>{pet.breed}</p>
                </div>
              ))
            )}
            <div style={{ flexShrink:0, textAlign:"center" }}>
              <div onClick={()=>go("pet-form")} style={{ width:64, height:64, borderRadius:20, background:PL, display:"flex", alignItems:"center", justifyContent:"center", border:`2px dashed ${P}`, cursor:"pointer", marginBottom:6 }}><Plus size={22} color={P}/></div>
              <p style={{ fontSize:12, color:T2, margin:0 }}>Add pet</p>
            </div>
          </div>
        </div>

        {/* Top Sitters */}
        <div style={{ padding:"20px 20px 16px" }}>
          <SectionHeader title="Top Rated Nearby" onViewAll={()=>go("sitters-list")}/>
          {SITTERS.slice(0,2).map(s => <SitterCard key={s.id} sitter={s} onClick={()=>{ set("selectedSitter",s); go("sitter-profile") }}/>)}
        </div>
      </div>

      <BottomNav active="home" go={go}/>
      {showLocationModal && <LocationModal onConfirm={city => { set("location", city); set("showLocationModal", false) }}/>}
    </div>
  )
}

function ServiceSelectScreen({ go, state, set }) {
  const { serviceType, petType, selectedService, startDate, endDate } = state
  const svcList = serviceType === "boarding" ? BOARDING_SVC : (petType === "cat" ? CAT_SITTER_SVC : DOG_SITTER_SVC)
  const canContinue = serviceType && (serviceType==="boarding" || petType) && selectedService && startDate && endDate

  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <TopBar title="Find a Service" onBack={()=>go("home")}/>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 100px" }}>
        {/* Service Type */}
        <div style={{ marginBottom:20 }}>
          <p style={{ fontSize:13, fontWeight:600, color:T2, textTransform:"uppercase", letterSpacing:0.5, margin:"0 0 10px" }}>Service Type</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[{id:"sitter",label:"Find a Sitter",desc:"Home & visits"},{id:"boarding",label:"Find Boarding",desc:"Facilities & kennels"}].map(t=>(
              <button key={t.id} onClick={()=>{set("serviceType",t.id);set("selectedService","")}} style={{ padding:"16px 14px", borderRadius:16, border:`2px solid ${serviceType===t.id?P:BD}`, background:serviceType===t.id?PL:SUR, cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.15s" }}>
                <p style={{ fontSize:14, fontWeight:700, color:serviceType===t.id?P:TX, margin:"0 0 4px" }}>{t.label}</p>
                <p style={{ fontSize:12, color:T2, margin:0 }}>{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Pet Type — only for sitter */}
        {serviceType === "sitter" && (
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:13, fontWeight:600, color:T2, textTransform:"uppercase", letterSpacing:0.5, margin:"0 0 10px" }}>Your Pet</p>
            <div style={{ display:"flex", gap:10 }}>
              {["dog","cat"].map(p=>(
                <button key={p} onClick={()=>{set("petType",p);set("selectedService","")}} style={{ flex:1, padding:"16px", borderRadius:16, border:`2px solid ${petType===p?P:BD}`, background:petType===p?PL:SUR, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"all 0.15s" }}>
                  <span style={{ fontSize:22 }}>{p==="dog"?"🐶":"🐱"}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:petType===p?P:TX, textTransform:"capitalize" }}>{p}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Service Options */}
        {(serviceType === "boarding" || petType) && (
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:13, fontWeight:600, color:T2, textTransform:"uppercase", letterSpacing:0.5, margin:"0 0 10px" }}>Select Service</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {svcList.map(s=>(
                <button key={s.id} onClick={()=>set("selectedService",s.id)} style={{ padding:"16px", borderRadius:16, border:`2px solid ${selectedService===s.id?P:BD}`, background:selectedService===s.id?PL:SUR, cursor:"pointer", textAlign:"left", fontFamily:"inherit", display:"flex", justifyContent:"space-between", alignItems:"center", transition:"all 0.15s" }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:selectedService===s.id?P:TX, margin:"0 0 3px" }}>{s.label}</p>
                    <p style={{ fontSize:12, color:T2, margin:0 }}>{s.desc}</p>
                  </div>
                  {selectedService===s.id && <div style={{ width:22, height:22, borderRadius:11, background:P, display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={13} color="#fff" strokeWidth={3}/></div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dates */}
        <div style={{ marginBottom:20 }}>
          <p style={{ fontSize:13, fontWeight:600, color:T2, textTransform:"uppercase", letterSpacing:0.5, margin:"0 0 10px" }}>Dates</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[{label:"Start Date",key:"startDate",val:startDate},{label:"End Date",key:"endDate",val:endDate}].map(d=>(
              <div key={d.key}>
                <p style={{ fontSize:12, color:T2, margin:"0 0 6px" }}>{d.label}</p>
                <input type="date" value={d.val||""} onChange={e=>set(d.key,e.target.value)} min={new Date().toISOString().split("T")[0]}
                  style={{ width:"100%", padding:"12px 14px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box", color:TX }}/>
              </div>
            ))}
          </div>
        </div>

        {canContinue && (
          <div style={{ background:S2, borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
            <p style={{ fontSize:13, color:T2, margin:0 }}>Finding: <strong style={{color:TX}}>{svcList.find(s=>s.id===selectedService)?.label}</strong>{petType&&serviceType==="sitter"?` for your ${petType}`:""}</p>
          </div>
        )}
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Find Available Sitters" onClick={()=>go("pet-profile")} disabled={!canContinue}/>
      </div>
    </div>
  )
}

function PetProfileScreen({ go, state, set }) {
  const [mode, setMode] = useState("choose") // choose | new
  const { selectedPet, userPets } = state
  const pets = userPets || []
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <TopBar title="Your Pet" onBack={()=>go("service-select")}/>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 100px" }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:TX, margin:"0 0 4px" }}>Who's getting care?</h2>
        <p style={{ fontSize:14, color:T2, margin:"0 0 24px" }}>
          {pets.length ? "Select a saved pet or add a new one" : "Add your first pet to continue"}
        </p>

        {pets.map(pet=>(
          <button
            key={pet.id}
            onClick={()=>{set("selectedPet",pet);setMode("choose")}}
            style={{ width:"100%", background:SUR, borderRadius:16, padding:16, marginBottom:12, border:`2px solid ${selectedPet?.id===pet.id?P:BD}`, cursor:"pointer", display:"flex", gap:14, alignItems:"center", fontFamily:"inherit", textAlign:"left" }}
          >
            <div style={{ width:52, height:52, borderRadius:16, background:pet.color||S2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{pet.species==="dog"?"🐕":"🐈"}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:16, color:TX, margin:"0 0 3px" }}>{pet.name}</p>
              <p style={{ fontSize:13, color:T2, margin:0 }}>{pet.breed} · {pet.size} · {pet.age}</p>
              <p style={{ fontSize:12, color:T3, margin:"2px 0 0" }}>Vaccinated · {pet.neutered==="Yes"?"Neutered":""}</p>
            </div>
            {selectedPet?.id===pet.id && (
              <div style={{ width:24, height:24, borderRadius:12, background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Check size={14} color="#fff" strokeWidth={3}/>
              </div>
            )}
          </button>
        ))}

        <button onClick={()=>go("pet-form")} style={{ width:"100%", padding:16, borderRadius:16, border:`2px dashed ${BD}`, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", gap:12, fontFamily:"inherit" }}>
          <div style={{ width:52, height:52, borderRadius:16, background:PL, display:"flex", alignItems:"center", justifyContent:"center" }}><Plus size={22} color={P}/></div>
          <div style={{ textAlign:"left" }}>
            <p style={{ fontWeight:600, fontSize:14, color:TX, margin:"0 0 3px" }}>Add a new pet</p>
            <p style={{ fontSize:12, color:T2, margin:0 }}>Saved for all future bookings</p>
          </div>
        </button>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Continue" onClick={()=>go("sitters-list")} disabled={!selectedPet}/>
      </div>
    </div>
  )
}

function PetFormScreen({ go, state, set }) {
  const [form, setForm] = useState({ name:"", species:"dog", breed:"", size:"", age:"", gender:"", neutered:"", needs:[], temperament:"" })
  const f = (k,v) => setForm(p=>({...p,[k]:v}))
  const breeds = form.species==="cat" ? CAT_BREEDS : DOG_BREEDS
  const done = form.name && form.species && form.breed && form.size && form.age && form.gender && form.neutered && form.temperament
  const save = () => {
    const newPet = {
      ...form,
      id: Date.now(),
      color: "#E8D9C4",
      initials: form.name.slice(0,2).toUpperCase(),
      verified: false,
    }
    const currentPets = state.userPets || []
    set("userPets", [...currentPets, newPet])
    set("selectedPet", newPet)
    go("sitters-list")
  }
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <TopBar title="Tell us about your pet" onBack={()=>go("pet-profile")}/>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 100px" }}>
        <p style={{ fontSize:13, color:T2, margin:"0 0 20px" }}>This is saved for all future bookings</p>
        <Input label="Pet Name *" value={form.name} onChange={v=>f("name",v)} placeholder="e.g. Bruno"/>
        <PillGroup label="Species *" options={["dog","cat"]} value={form.species} onChange={v=>{f("species",v);f("breed","")}}/>
        <SelectInput label="Breed *" value={form.breed} onChange={v=>f("breed",v)} options={breeds}/>
        <PillGroup label="Size *" options={["Small (<10kg)","Medium","Large","Giant"]} value={form.size} onChange={v=>f("size",v)}/>
        <PillGroup label="Age *" options={["Puppy","Adult","Senior"]} value={form.age} onChange={v=>f("age",v)}/>
        <PillGroup label="Gender *" options={["Male","Female"]} value={form.gender} onChange={v=>f("gender",v)}/>
        <PillGroup label="Spayed / Neutered *" options={["Yes","No"]} value={form.neutered} onChange={v=>f("neutered",v)}/>
        <div style={{ marginBottom:14 }}>
          <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 8px" }}>Vaccination Status *</p>
          <button style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:`1.5px dashed ${BD}`, background:SUR, display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontFamily:"inherit" }}>
            <Camera size={16} color={P}/><span style={{ fontSize:14, color:P, fontWeight:500 }}>Upload Certificate</span>
          </button>
        </div>
        <PillGroup label="Special Needs" options={["Medication","Anxiety","Dietary restrictions","Mobility issues","None"]} value={form.needs} onChange={v=>f("needs",v)} multi/>
        <PillGroup label="Temperament with Strangers *" options={["Friendly","Shy","Needs warming up"]} value={form.temperament} onChange={v=>f("temperament",v)}/>
        <div style={{ marginBottom:14 }}>
          <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 8px" }}>Pet Photo</p>
          <button style={{ width:"100%", padding:"20px", borderRadius:12, border:`1.5px dashed ${BD}`, background:SUR, display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:PL, display:"flex", alignItems:"center", justifyContent:"center" }}><Camera size={20} color={P}/></div>
            <p style={{ fontSize:13, color:T2, margin:0 }}>Tap to upload a photo</p>
          </button>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Save & Continue" onClick={save} disabled={!done}/>
      </div>
    </div>
  )
}

function SittersListScreen({ go, state, set }) {
  const { location, selectedService, startDate, endDate, petType, serviceType } = state
  const [maxPrice, setMaxPrice] = useState(1500)
  const [filters, setFilters] = useState([])
  const toggleFilter = f => setFilters(p => p.includes(f) ? p.filter(x=>x!==f) : [...p,f])
  const nights = startDate && endDate ? Math.max(1, Math.round((new Date(endDate)-new Date(startDate))/(1000*60*60*24))) : 1
  const svcName = [...DOG_SITTER_SVC,...CAT_SITTER_SVC,...BOARDING_SVC].find(s=>s.id===selectedService)?.label || "Service"

  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <TopBar title="Available Sitters" onBack={()=>go("service-select")}/>
        <div style={{ padding:"0 20px 12px" }}>
          <div style={{ background:S2, borderRadius:12, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p style={{ fontSize:13, fontWeight:600, color:TX, margin:0 }}>{location}</p>
              <p style={{ fontSize:12, color:T2, margin:0 }}>{svcName} · {nights} night{nights>1?"s":""}</p>
            </div>
            <button onClick={()=>go("service-select")} style={{ background:"none", border:"none", cursor:"pointer" }}><Edit2 size={15} color={P}/></button>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, padding:"0 20px 14px", overflowX:"auto" }}>
          {["Max ₹1500","Within 5 km","Has outdoor","Verified only"].map(f=>(
            <Chip key={f} label={f} active={filters.includes(f)} onClick={()=>toggleFilter(f)}/>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", paddingBottom:80 }}>
        <p style={{ fontSize:13, color:T2, margin:"0 0 14px" }}><strong style={{color:TX}}>{SITTERS.length} sitters</strong> available near you</p>
        {SITTERS.map(s=><SitterCard key={s.id} sitter={s} onClick={()=>{set("selectedSitter",s);go("sitter-profile")}}/>)}
      </div>
      <BottomNav active="search" go={go}/>
    </div>
  )
}

// Simple alias so the bottom "Search" tab opens the same flow
function SearchScreen(props) {
  return <ServiceSelectScreen {...props} />
}

function BookingsScreen({ go, state, set }) {
  const { bookingDone, selectedSitter: sitter, selectedPet: pet, startDate, endDate, finalTotal, userType, bookings = [] } = state
  const isExistingDemo = userType === "existing" && bookings.length > 0
  const hasBooking = bookingDone && sitter && startDate && endDate

  const resolveEntities = (b) => {
    const s = SITTERS.find(x => x.id === b.sitterId) || sitter || SITTERS[0]
    const p = (state.userPets || []).find(x => x.id === b.petId) || pet || (state.userPets || [])[0]
    return { s, p }
  }

  const handleBookingClick = (b) => {
    const { s, p } = resolveEntities(b)
    set("selectedSitter", s)
    set("selectedPet", p)
    set("startDate", b.startDate)
    set("endDate", b.endDate)
    set("finalTotal", b.total)
    if (b.status === "needs_review") {
      go("review")
    } else {
      go("review-done")
    }
  }
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column", position:"relative" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <div style={{ padding:"8px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h2 style={{ fontSize:18, fontWeight:800, color:TX, margin:0 }}>Bookings</h2>
          {isExistingDemo && <span style={{ fontSize:12, color:GN, fontWeight:600 }}>{bookings.length} stays</span>}
          {!isExistingDemo && hasBooking && <span style={{ fontSize:12, color:GN, fontWeight:600 }}>1 active</span>}
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 80px" }}>
        {isExistingDemo ? (
          <>
            {bookings.map(b => {
              const { s, p } = resolveEntities(b)
              return (
                <button
                  key={b.id}
                  onClick={()=>handleBookingClick(b)}
                  style={{ width:"100%", background:SUR, borderRadius:18, padding:16, marginBottom:12, border:"none", textAlign:"left", display:"flex", gap:14, alignItems:"center", cursor:"pointer", fontFamily:"inherit" }}
                >
                  <Avatar initials={s.initials} color={s.color} size={52}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                      <p style={{ fontWeight:700, fontSize:16, color:TX, margin:0 }}>{s.name}</p>
                      <span style={{ fontSize:11, padding:"4px 8px", borderRadius:999, background:b.status==="needs_review"?PL:GL, color:b.status==="needs_review"?P:GN, fontWeight:600 }}>
                        {b.tag}
                      </span>
                    </div>
                    <p style={{ fontSize:13, color:T2, margin:"0 0 2px" }}>
                      {p ? `${p.name} · ${p.species==="dog"?"Dog":"Cat"}` : "Your pet"}
                    </p>
                    <p style={{ fontSize:12, color:T3, margin:0 }}>{b.startDate} → {b.endDate}</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontSize:11, color:T3, margin:"0 0 2px" }}>Total</p>
                    <p style={{ fontSize:16, fontWeight:700, color:TX, margin:0 }}>₹{b.total}</p>
                  </div>
                </button>
              )
            })}
          </>
        ) : !hasBooking ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ width:64, height:64, borderRadius:22, background:S2, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:30 }}>📅</div>
            <p style={{ fontSize:18, fontWeight:700, color:TX, margin:"0 0 6px" }}>No bookings yet</p>
            <p style={{ fontSize:14, color:T2, margin:"0 0 20px" }}>When you book a sitter or boarding, it will appear here.</p>
            <Btn label="Book a service" onClick={()=>go("service-select")} />
          </div>
        ) : (
          <div>
            <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14, display:"flex", gap:14, alignItems:"center" }}>
              <Avatar initials={sitter.initials} color={sitter.color} size={52}/>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, fontSize:16, color:TX, margin:"0 0 2px" }}>{sitter.name}</p>
                <p style={{ fontSize:13, color:T2, margin:"0 0 2px" }}>{pet ? `${pet.name} · ${pet.species==="dog"?"Dog":"Cat"}` : "Your pet"}</p>
                <p style={{ fontSize:12, color:T3, margin:0 }}>{startDate} → {endDate}</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ fontSize:11, color:T3, margin:"0 0 2px" }}>Amount</p>
                <p style={{ fontSize:16, fontWeight:700, color:TX, margin:0 }}>₹{finalTotal||"—"}</p>
              </div>
            </div>
            <div style={{ background:SUR, borderRadius:16, padding:14 }}>
              <p style={{ fontSize:13, color:T2, margin:"0 0 10px" }}>Your sitter is currently caring for your pet.</p>
              <div style={{ display:"flex", gap:10 }}>
                <Btn label="View live updates" onClick={()=>go("live-tracking")} small full={false}/>
                <Btn label="Booking details" onClick={()=>go("booking-confirm")} variant="secondary" small full={false}/>
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav active="bookings" go={go}/>
    </div>
  )
}

function MessagesScreen({ go, state }) {
  const { bookingDone, selectedSitter: sitter, userType, bookings = [] } = state
  const hasThread = bookingDone && sitter
  const isExistingDemo = userType === "existing" && bookings.length > 0
  const [activeBookingId, setActiveBookingId] = useState(null)

  const activeId = activeBookingId || (isExistingDemo ? bookings[0]?.id : null)
  const activeBooking = isExistingDemo ? bookings.find(b => b.id === activeId) || bookings[0] : null
  const activeChat = isExistingDemo && activeBooking ? (MOCK_BOOKING_CHATS[activeBooking.id] || []) : []
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column", position:"relative" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <div style={{ padding:"8px 20px 12px" }}>
          <h2 style={{ fontSize:18, fontWeight:800, color:TX, margin:0 }}>Messages</h2>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 20px 80px" }}>
        {isExistingDemo ? (
          <div>
            <p style={{ fontSize:13, color:T2, margin:"0 0 10px" }}>Choose a booking to view its chat</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
              {bookings.map(b => {
                const s = SITTERS.find(x => x.id === b.sitterId) || sitter || SITTERS[0]
                const p = (state.userPets || []).find(x => x.id === b.petId) || (state.userPets || [])[0]
                const selected = b.id === activeId
                return (
                  <button
                    key={b.id}
                    onClick={()=>setActiveBookingId(b.id)}
                    style={{
                      width:"100%",
                      padding:"10px 12px",
                      borderRadius:12,
                      border:`1.5px solid ${selected?P:BD}`,
                      background:selected?PL:SUR,
                      display:"flex",
                      alignItems:"center",
                      gap:10,
                      cursor:"pointer",
                      fontFamily:"inherit",
                      textAlign:"left",
                    }}
                  >
                    <Avatar initials={s.initials} color={s.color} size={36}/>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:14, fontWeight:600, color:TX }}>{s.name}</span>
                        <span style={{ fontSize:11, color:T3 }}>{b.startDate}</span>
                      </div>
                      <span style={{ fontSize:12, color:T2 }}>
                        {p ? `${p.name} · ${p.species==="dog"?"Dog":"Cat"}` : "Your pet"}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
            {activeBooking && (
              <div style={{ background:SUR, borderRadius:16, padding:14 }}>
                <p style={{ fontSize:13, color:T3, margin:"0 0 8px" }}>Chat for booking #{activeBooking.id}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {activeChat.length === 0 ? (
                    <p style={{ fontSize:13, color:T2, margin:0 }}>No messages yet in this booking.</p>
                  ) : activeChat.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                        maxWidth:"80%",
                      }}
                    >
                      <div
                        style={{
                          padding:"8px 10px",
                          borderRadius:12,
                          background:m.from === "user" ? P : S2,
                          color:m.from === "user" ? "#fff" : TX,
                          fontSize:13,
                        }}
                      >
                        {m.text}
                      </div>
                      <span style={{ fontSize:10, color:T3, marginTop:2, display:"block", textAlign:m.from==="user"?"right":"left" }}>
                        {m.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !hasThread ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ width:64, height:64, borderRadius:22, background:S2, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:30 }}>💬</div>
            <p style={{ fontSize:18, fontWeight:700, color:TX, margin:"0 0 6px" }}>No conversations yet</p>
            <p style={{ fontSize:14, color:T2, margin:"0 0 20px" }}>Book a sitter to start chatting with them here.</p>
            <Btn label="Find a sitter" onClick={()=>go("service-select")} />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom:14, fontSize:13, color:T3 }}>Pinned</div>
            <div style={{ background:SUR, borderRadius:16, padding:12, display:"flex", gap:12, alignItems:"center", marginBottom:14, cursor:"pointer" }}>
              <Avatar initials={sitter.initials} color={sitter.color} size={44}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:2 }}>
                  <p style={{ fontSize:15, fontWeight:700, color:TX, margin:0 }}>{sitter.name}</p>
                  <span style={{ fontSize:11, color:T3 }}>Just now</span>
                </div>
                <p style={{ fontSize:13, color:T2, margin:0 }}>“Just finished the afternoon walk, sending photos now!”</p>
              </div>
            </div>
            <div style={{ background:SUR, borderRadius:16, padding:12, marginTop:16 }}>
              <p style={{ fontSize:13, color:T2, margin:"0 0 4px" }}>In a real app, this tab would show your full chat history with sitters.</p>
              <p style={{ fontSize:12, color:T3, margin:0 }}>For now, use the **Bookings** tab to follow your current stay.</p>
            </div>
          </div>
        )}
      </div>
      <BottomNav active="messages" go={go}/>
    </div>
  )
}

function ProfileScreen({ go, state, reset }) {
  const { userName, userType, phone, location, userPets, bookingDone, bookings = [] } = state
  const name = userName || "Pet parent"
  const initial = name.trim()[0]?.toUpperCase() || "P"
  const pets = userPets || []
  const bookingsCount = bookings.length || (bookingDone ? 1 : 0)
  const handleLogout = () => {
    if (window.confirm("Log out from PetVesta and switch user?")) {
      reset()
      go("auth")
    }
  }
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column", position:"relative" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <div style={{ padding:"8px 20px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h2 style={{ fontSize:18, fontWeight:800, color:TX, margin:0 }}>Profile</h2>
          <button
            onClick={handleLogout}
            style={{ padding:"8px 12px", borderRadius:999, border:`1px solid ${BD}`, background:"transparent", fontSize:12, color:ERR, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}
          >
            Log out
          </button>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 80px" }}>
        <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:20 }}>
          <div style={{ width:56, height:56, borderRadius:20, background:"#E8D9C4", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:22, fontWeight:700, color:TX }}>{initial}</span>
          </div>
          <div>
            <p style={{ fontSize:18, fontWeight:800, color:TX, margin:"0 0 4px" }}>{name}</p>
            <p style={{ fontSize:13, color:T2, margin:0 }}>
              {userType==="new" && "New Pet Parent"}
              {userType==="existing" && "Returning Pet Parent"}
              {!userType && "Pet Parent"}
            </p>
          </div>
        </div>

        <div style={{ background:SUR, borderRadius:16, padding:14, marginBottom:14 }}>
          <p style={{ fontSize:13, fontWeight:700, color:TX, margin:"0 0 10px" }}>Account</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:13, color:T2 }}>Mobile</span>
              <span style={{ fontSize:13, color:TX }}>{phone ? `+91 ${phone}` : "Not added"}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:13, color:T2 }}>Location</span>
              <button
                onClick={()=>go("home")}
                style={{ fontSize:13, color:TX, background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"inherit" }}
              >
                {location || "Set from Home"}
              </button>
            </div>
          </div>
        </div>

        <div style={{ background:SUR, borderRadius:16, padding:14, marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:13, color:T2, margin:"0 0 4px" }}>Your Pets</p>
            <p style={{ fontSize:16, fontWeight:700, color:TX, margin:0 }}>{pets.length}</p>
          </div>
          <Btn label="Manage" onClick={()=>go("pet-profile")} small full={false}/>
        </div>

        <div style={{ background:SUR, borderRadius:16, padding:14, marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:13, color:T2, margin:"0 0 4px" }}>Bookings</p>
            <p style={{ fontSize:16, fontWeight:700, color:TX, margin:0 }}>{bookingsCount}</p>
          </div>
          <Btn label="View" onClick={()=>go("bookings")} small full={false}/>
        </div>

        <div style={{ background:SUR, borderRadius:16, padding:14 }}>
          <p style={{ fontSize:13, fontWeight:700, color:TX, margin:"0 0 6px" }}>Support</p>
          <p style={{ fontSize:13, color:T2, margin:"0 0 10px" }}>Need help with a booking or sitter?</p>
          <Btn
            label="Contact support"
            onClick={() => window.alert("In a real app, this would open chat or email with PetVesta support.")}
            small
          />
        </div>
      </div>
      <BottomNav active="profile" go={go}/>
    </div>
  )
}

function SitterProfileScreen({ go, state, set }) {
  const sitter = state.selectedSitter
  const [selectedAddonIds, setSelectedAddonIds] = useState([])
  const { startDate, endDate } = state
  const nights = startDate && endDate ? Math.max(1,Math.round((new Date(endDate)-new Date(startDate))/(1000*60*60*24))) : 1
  const toggleAddon = id => setSelectedAddonIds(p => p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const base = (sitter?.services?.sitting || sitter?.price || 0) * nights
  const addonTotal = ADDONS.filter(a=>selectedAddonIds.includes(a.id)).reduce((s,a)=>s+(a.per==="night"?a.price*nights:a.price),0)
  const total = base + addonTotal
  if(!sitter) return null

  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ overflowY:"auto", flex:1, paddingBottom:100 }}>
        {/* Hero */}
        <div style={{ height:180, background:`linear-gradient(135deg, ${sitter.color} 0%, #E0D5C8 100%)`, position:"relative" }}>
          <button onClick={()=>go("sitters-list")} style={{ position:"absolute", top:52, left:20, width:36, height:36, borderRadius:12, background:"rgba(255,255,255,0.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><ArrowLeft size={18} color={TX}/></button>
          <button style={{ position:"absolute", top:52, right:20, width:36, height:36, borderRadius:12, background:"rgba(255,255,255,0.8)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Heart size={18} color={TX}/></button>
        </div>
        <div style={{ background:SUR, marginTop:-1 }}>
          <div style={{ padding:"0 20px", display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:-32, paddingBottom:16 }}>
            <div style={{ position:"relative" }}>
              <Avatar initials={sitter.initials} color={sitter.color} size={64}/>
              {sitter.verified && <div style={{ position:"absolute", bottom:0, right:0, width:20, height:20, background:GN, borderRadius:10, border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={11} color="#fff" strokeWidth={3}/></div>}
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <Star size={14} color="#F59E0B" fill="#F59E0B"/>
                <span style={{ fontSize:16, fontWeight:700, color:TX }}>{sitter.rating}</span>
                <span style={{ fontSize:13, color:T2 }}>· {sitter.reviews} reviews</span>
              </div>
            </div>
          </div>
          <div style={{ padding:"0 20px 20px" }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:TX, margin:"0 0 4px" }}>{sitter.name}</h2>
            <p style={{ fontSize:14, color:T2, margin:"0 0 12px", lineHeight:1.6 }}>{sitter.bio}</p>
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 14px", background:GL, borderRadius:10 }}>
              <Repeat2 size={14} color={GN}/>
              <span style={{ fontSize:13, color:GN, fontWeight:500 }}>{sitter.rebooked} pet parents have re-booked</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div style={{ background:SUR, marginTop:8, padding:"20px" }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:TX, margin:"0 0 14px" }}>Services & Pricing</h3>
          {Object.entries(sitter.services).map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${BD}` }}>
              <span style={{ fontSize:14, color:TX, textTransform:"capitalize" }}>{k}</span>
              <span style={{ fontSize:14, fontWeight:600, color:TX }}>₹{v}<span style={{ fontSize:12, color:T2, fontWeight:400 }}>/night</span></span>
            </div>
          ))}
        </div>

        {/* Includes */}
        <div style={{ background:SUR, marginTop:8, padding:"20px" }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:TX, margin:"0 0 14px" }}>What's Included</h3>
          {["Pet first aid kit on hand","Food & water bowls provided","Cozy sleeping area","Daily photo & text updates"].map(i=>(
            <div key={i} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
              <div style={{ width:20, height:20, borderRadius:10, background:GL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check size={11} color={GN} strokeWidth={3}/></div>
              <span style={{ fontSize:14, color:TX }}>{i}</span>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div style={{ background:SUR, marginTop:8, padding:"20px" }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:TX, margin:"0 0 4px" }}>Optional Add-ons</h3>
          <p style={{ fontSize:13, color:T2, margin:"0 0 14px" }}>Tap to add — price updates live below</p>
          {ADDONS.map(a=>{
            const isOn = selectedAddonIds.includes(a.id)
            return (
              <div key={a.id} onClick={()=>toggleAddon(a.id)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderRadius:12, border:`1.5px solid ${isOn?P:BD}`, background:isOn?PL:SUR, marginBottom:10, cursor:"pointer", transition:"all 0.15s" }}>
                <div>
                  <p style={{ fontSize:14, fontWeight:500, color:TX, margin:"0 0 2px" }}>{a.name}</p>
                  <p style={{ fontSize:12, color:T2, margin:0 }}>₹{a.price}/{a.per}</p>
                </div>
                <div style={{ width:24, height:24, borderRadius:12, background:isOn?P:S2, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
                  {isOn ? <Check size={13} color="#fff" strokeWidth={3}/> : <Plus size={13} color={T2}/>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Home Details */}
        <div style={{ background:SUR, marginTop:8, padding:"20px" }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:TX, margin:"0 0 14px" }}>Home Details</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[{ label:"Home Type", value:sitter.home }, { label:"Outdoor Space", value:sitter.outdoor?"Yes":"No" }, { label:"Other Pets", value:sitter.otherPets }, { label:"Children", value:sitter.children?"Present":"None" }].map(d=>(
              <div key={d.label} style={{ background:S2, borderRadius:12, padding:"12px 14px" }}>
                <p style={{ fontSize:11, color:T3, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:0.3 }}>{d.label}</p>
                <p style={{ fontSize:13, fontWeight:600, color:TX, margin:0 }}>{d.value}</p>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, marginTop:14 }}>
            {["ID Verified","Address Verified","Pet First-Aid"].map(b=>(
              <div key={b} style={{ flex:1, background:GL, borderRadius:10, padding:"8px 10px", textAlign:"center" }}>
                <p style={{ fontSize:11, fontWeight:600, color:GN, margin:0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:SUR, borderTop:`1px solid ${BD}`, padding:"14px 20px 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div>
            <p style={{ fontSize:12, color:T2, margin:0 }}>Base ({nights} night{nights>1?"s":""} × ₹{sitter.services?.sitting||sitter.price})</p>
            {addonTotal>0 && <p style={{ fontSize:12, color:P, margin:0 }}>+ Add-ons ₹{addonTotal}</p>}
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontSize:11, color:T3, margin:0 }}>Estimated total</p>
            <p style={{ fontSize:22, fontWeight:800, color:TX, margin:0 }}>₹{total}</p>
          </div>
        </div>
        <Btn label="Book Now" onClick={()=>{ set("selectedAddons", selectedAddonIds); set("bookingTotal",total); set("nights",nights); go("booking-confirm") }}/>
      </div>
    </div>
  )
}

function BookingConfirmScreen({ go, state, set }) {
  const { selectedSitter: sitter, selectedPet: pet, startDate, endDate, nights=1, bookingTotal=0 } = state
  const SERVICE_FEE = 149
  const peak = 100
  const gst = Math.round((bookingTotal + SERVICE_FEE + peak) * 0.18)
  const total = bookingTotal + SERVICE_FEE + peak + gst
  useEffect(() => { set("finalTotal", total) }, [total])
  if(!sitter) return null
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <TopBar title="Confirm Booking" onBack={()=>go("sitter-profile")}/>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 100px" }}>
        {/* Sitter + service summary */}
        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14, display:"flex", gap:14, alignItems:"center" }}>
          <Avatar initials={sitter.initials} color={sitter.color} size={52}/>
          <div>
            <p style={{ fontWeight:700, fontSize:16, color:TX, margin:"0 0 3px" }}>{sitter.name}</p>
            <p style={{ fontSize:13, color:T2, margin:"0 0 3px" }}>Pet Sitting · {nights} night{nights>1?"s":""}</p>
            <p style={{ fontSize:13, color:T2, margin:0 }}>{startDate} → {endDate}</p>
          </div>
        </div>
        {pet && (
          <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14, display:"flex", gap:14, alignItems:"center" }}>
            <div style={{ width:52, height:52, borderRadius:16, background:S2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{pet.species==="dog"?"🐕":"🐈"}</div>
            <div>
              <p style={{ fontWeight:700, fontSize:16, color:TX, margin:"0 0 3px" }}>{pet.name}</p>
              <p style={{ fontSize:13, color:T2, margin:0 }}>{pet.breed} · {pet.size}</p>
            </div>
          </div>
        )}
        {/* Info note */}
        <div style={{ background:"#EFF6FF", borderRadius:12, padding:"12px 16px", marginBottom:14, display:"flex", gap:10 }}>
          <div style={{ width:18, height:18, borderRadius:9, background:"#3B82F6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}><span style={{ fontSize:11, color:"#fff", fontWeight:700 }}>i</span></div>
          <p style={{ fontSize:13, color:"#1D4ED8", margin:0, lineHeight:1.6 }}>Care instructions (feeding schedule, key handover, emergency contacts) will be captured after payment.</p>
        </div>
        {/* Price breakdown */}
        <div style={{ background:SUR, borderRadius:18, padding:16 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:TX, margin:"0 0 14px" }}>Price Breakdown</h3>
          {[
            { label:`Base rate (${nights} night${nights>1?"s":""} × ₹${sitter.services?.sitting||sitter.price})`, value:`₹${bookingTotal}` },
            { label:"Peak slot charge", value:"+₹100", highlight:true },
            { label:"Service fee", value:`₹${SERVICE_FEE}` },
            { label:"GST (18%)", value:`₹${gst}` },
          ].map(r=>(
            <div key={r.label} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${BD}` }}>
              <span style={{ fontSize:14, color:T2 }}>{r.label}</span>
              <span style={{ fontSize:14, fontWeight:600, color:r.highlight?P:TX }}>{r.value}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", paddingTop:12 }}>
            <span style={{ fontSize:16, fontWeight:700, color:TX }}>Total</span>
            <span style={{ fontSize:20, fontWeight:800, color:TX }}>₹{total}</span>
          </div>
          <p style={{ fontSize:12, color:T3, margin:"8px 0 0", textAlign:"center" }}>You won't be charged until the sitter confirms</p>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Proceed to Pay" onClick={()=>go("payment")}/>
      </div>
    </div>
  )
}

function PaymentScreen({ go, state, set }) {
  const [method, setMethod] = useState("upi")
  const { finalTotal=1355 } = state
  const methods = [
    { id:"upi", icon:<Smartphone size={18} color={P}/>, label:"UPI", sub:"GPay, PhonePe, Paytm", badge:"#1 in India" },
    { id:"card", icon:<CreditCard size={18} color={T2}/>, label:"Credit / Debit Card", sub:"Visa, Mastercard, RuPay" },
    { id:"netbanking", icon:<Building2 size={18} color={T2}/>, label:"Net Banking", sub:"All major banks" },
    { id:"wallet", icon:<Wallet size={18} color={T2}/>, label:"Wallet Balance", sub:"PetVesta Wallet · ₹0" },
  ]
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <TopBar title="Payment" onBack={()=>go("booking-confirm")}/>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 100px" }}>
        <div style={{ background:TX, borderRadius:18, padding:"20px", marginBottom:16, textAlign:"center" }}>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", margin:"0 0 6px" }}>Total Amount</p>
          <p style={{ fontSize:34, fontWeight:800, color:"#fff", margin:"0 0 6px", letterSpacing:-1 }}>₹{finalTotal}</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <Lock size={12} color="rgba(255,255,255,0.4)"/>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>Held securely in escrow until service is complete</span>
          </div>
        </div>

        <div style={{ background:SUR, borderRadius:16, padding:"14px 16px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ fontSize:14, fontWeight:600, color:TX, margin:0 }}>Vouchers & Offers</p>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <button
              onClick={()=>window.alert("Best available offer will be auto-applied at checkout in this prototype.")}
              style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"inherit" }}
            >
              <span style={{ fontSize:13, color:P, fontWeight:500 }}>View 4 available</span>
              <ChevronRight size={14} color={P}/>
            </button>
          </div>
        </div>

        <div style={{ background:SUR, borderRadius:18, overflow:"hidden", marginBottom:16 }}>
          <p style={{ fontSize:13, fontWeight:600, color:T2, textTransform:"uppercase", letterSpacing:0.5, padding:"16px 16px 10px", margin:0 }}>Payment Method</p>
          {methods.map(m=>(
            <button key={m.id} onClick={()=>setMethod(m.id)} style={{ width:"100%", padding:"14px 16px", borderTop:`1px solid ${BD}`, background:method===m.id?PL:SUR, display:"flex", gap:14, alignItems:"center", cursor:"pointer", fontFamily:"inherit", border:"none", borderTop:`1px solid ${BD}`, textAlign:"left" }}>
              <div style={{ width:36, height:36, borderRadius:10, background:method===m.id?PL:S2, display:"flex", alignItems:"center", justifyContent:"center" }}>{m.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontSize:14, fontWeight:600, color:TX }}>{m.label}</span>
                  {m.badge && <span style={{ fontSize:10, padding:"2px 8px", background:"#FEF9C3", color:"#854D0E", borderRadius:100, fontWeight:600 }}>{m.badge}</span>}
                </div>
                <span style={{ fontSize:12, color:T2 }}>{m.sub}</span>
              </div>
              <div style={{ width:20, height:20, borderRadius:10, border:`2px solid ${method===m.id?P:BD}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {method===m.id && <div style={{ width:10, height:10, borderRadius:5, background:P }}/>}
              </div>
            </button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
          {["100% refundable if cancelled 24 hours before","Payment held securely until service is complete","Covered by PetGuard insurance"].map(t=>(
            <div key={t} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <CheckCircle size={15} color={GN} style={{ flexShrink:0, marginTop:1 }}/>
              <span style={{ fontSize:13, color:T2 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
          <Lock size={12} color={T3}/><span style={{ fontSize:11, color:T3 }}>SSL encrypted · PCI-DSS compliant</span>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label={`Pay ₹${finalTotal}`} onClick={()=>go("care-details")} variant="dark"/>
      </div>
    </div>
  )
}

function CareDetailsScreen({ go, state, set }) {
  const [details, setDetails] = useState({ keyMethod:"", feeding:"2x", walkSchedule:[], emergencyVet:"", emergencyContact:"", notes:"" })
  const d = (k,v) => setDetails(p=>({...p,[k]:v}))
  const toggleWalk = w => setDetails(p=>({ ...p, walkSchedule: p.walkSchedule.includes(w)?p.walkSchedule.filter(x=>x!==w):[...p.walkSchedule,w] }))
  const { selectedSitter: sitter, selectedPet: pet, startDate, endDate, finalTotal, bookings = [] } = state
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <div style={{ padding:"8px 20px 16px" }}>
          <div style={{ width:48, height:48, borderRadius:16, background:GL, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
            <CheckCircle size={24} color={GN}/>
          </div>
          <p style={{ fontSize:13, color:GN, fontWeight:600, margin:"0 0 4px" }}>Payment Successful</p>
          <h2 style={{ fontSize:20, fontWeight:800, color:TX, margin:0 }}>Share care details with {sitter?.name?.split(" ")[0]}</h2>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 100px" }}>
        <PillGroup label="Key Handover Method *" options={["In-person","Lockbox","Key with neighbour"]} value={details.keyMethod} onChange={v=>d("keyMethod",v)}/>
        <PillGroup label="Feeding Schedule" options={["1x daily","2x daily","3x daily"]} value={details.feeding} onChange={v=>d("feeding",v)}/>
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 6px" }}>Feeding Instructions</p>
          <textarea value={details.feedingNotes||""} onChange={e=>d("feedingNotes",e.target.value)} placeholder="e.g. Half cup kibble mixed with wet food at 8am and 6pm..." style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:14, fontFamily:"inherit", resize:"none", height:72, outline:"none", boxSizing:"border-box" }}/>
        </div>
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 8px" }}>Walk Schedule</p>
          <div style={{ display:"flex", gap:8 }}>
            {["Morning","Afternoon","Evening"].map(w=>{
              const a=details.walkSchedule.includes(w)
              return <button key={w} onClick={()=>toggleWalk(w)} style={{ flex:1, padding:"10px 0", borderRadius:12, border:`1.5px solid ${a?P:BD}`, background:a?P:SUR, color:a?"#fff":TX, fontSize:13, fontWeight:a?600:400, cursor:"pointer", fontFamily:"inherit" }}>{w}</button>
            })}
          </div>
        </div>
        <Input label="Emergency Vet (name + number)" value={details.emergencyVet} onChange={v=>d("emergencyVet",v)} placeholder="Dr. Sharma · 9876543210"/>
        <Input label="Your Emergency Contact" value={details.emergencyContact} onChange={v=>d("emergencyContact",v)} placeholder="+91 98765 43210"/>
        <div style={{ marginBottom:14 }}>
          <p style={{ fontSize:13, fontWeight:600, color:TX, margin:"0 0 6px" }}>Anything else {sitter?.name?.split(" ")[0]} should know?</p>
          <textarea value={details.notes} onChange={e=>d("notes",e.target.value)} placeholder="Any important notes, routines, or preferences..." style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:14, fontFamily:"inherit", resize:"none", height:80, outline:"none", boxSizing:"border-box" }}/>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn
          label="Save & Continue"
          onClick={()=>{
            set("careDetails",details)
            set("bookingDone", true)
            // Append this booking to list for new users
            if (sitter && startDate && endDate) {
              const newBooking = {
                id: Date.now(),
                sitterId: sitter.id,
                petId: pet?.id,
                startDate,
                endDate,
                total: finalTotal || 0,
                status: "in_progress",
                tag: "Upcoming",
              }
              set("bookings", [...bookings, newBooking])
            }
            go("all-set")
          }}
          disabled={!details.keyMethod}
        />
      </div>
    </div>
  )
}

function AllSetScreen({ go, state }) {
  const { selectedSitter: sitter, selectedPet: pet } = state
  const [checklist, setChecklist] = useState([false,false,false,false])
  const toggle = i => setChecklist(p=>{const n=[...p];n[i]=!n[i];return n})
  const checkItems = ["Food and treats packed / stocked","Medication with written instructions ready","Favourite toy or blanket kept out","Key handover arranged with sitter"]
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <StatusBar/>
      <div style={{ flex:1, overflowY:"auto", padding:"8px 20px 100px" }}>
        <div style={{ textAlign:"center", padding:"20px 0 28px" }}>
          <div style={{ width:72, height:72, background:GL, borderRadius:24, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <CheckCircle size={36} color={GN}/>
          </div>
          <h1 style={{ fontSize:26, fontWeight:800, color:TX, margin:"0 0 6px" }}>You're all set!</h1>
          <p style={{ fontSize:15, color:T2, margin:0 }}>{sitter?.name} will care for {pet?.name||"your pet"}</p>
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 14px" }}>Already handled for you</h3>
          {["Booking confirmation sent via SMS + Email","Care instructions shared with sitter","Emergency contact noted by sitter","Vet contact on file"].map((item,i)=>(
            <div key={i} style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
              <div style={{ width:22, height:22, borderRadius:11, background:GL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check size={12} color={GN} strokeWidth={3}/></div>
              <span style={{ fontSize:14, color:TX }}>{item}</span>
              <span style={{ fontSize:12, color:GN, fontWeight:600, marginLeft:"auto" }}>Done</span>
            </div>
          ))}
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 14px" }}>Your pre-service checklist</h3>
          {checkItems.map((item,i)=>(
            <button key={i} onClick={()=>toggle(i)} style={{ width:"100%", display:"flex", gap:12, alignItems:"center", marginBottom:12, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left", padding:0 }}>
              <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${checklist[i]?GN:BD}`, background:checklist[i]?GL:SUR, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{checklist[i]&&<Check size={12} color={GN} strokeWidth={3}/>}</div>
              <span style={{ fontSize:14, color:checklist[i]?T2:TX, textDecoration:checklist[i]?"line-through":"none" }}>{item}</span>
            </button>
          ))}
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 14px" }}>You'll be notified</h3>
          {["48h before: Reminder to prepare","24h before: Sitter will confirm","2h before: Sitter is on the way","On arrival: Service start confirmation"].map((n,i)=>(
            <div key={i} style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
              <Bell size={15} color={P} style={{ flexShrink:0 }}/>
              <span style={{ fontSize:13, color:T2 }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Go to Home" onClick={()=>go("home")}/>
      </div>
    </div>
  )
}

function LiveTrackingScreen({ go, state }) {
  const { selectedSitter: sitter, selectedPet: pet } = state
  const steps = [
    { label:"Booking Confirmed", sub:"Payment received · Care instructions sent", done:true },
    { label:"Sitter Arrived", sub:"Sitter checked in at your home", done:true },
    { label:"Service In Progress", sub:"Caring for your pet right now", done:false, active:true },
    { label:"Service Completed", sub:"All done!", done:false },
  ]
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <div style={{ padding:"8px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h2 style={{ fontSize:18, fontWeight:800, color:TX, margin:0 }}>{pet?.name||"Pet"}'s Updates</h2>
          <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"#FEF2F2", borderRadius:100 }}>
            <div style={{ width:7, height:7, borderRadius:4, background:ERR, animation:"pulse 1.5s infinite" }}/>
            <span style={{ fontSize:12, fontWeight:700, color:ERR }}>Live</span>
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"0 20px 100px" }}>
        {/* Sitter bar */}
        <div style={{ background:SUR, borderRadius:14, padding:"12px 14px", marginBottom:14, display:"flex", gap:12, alignItems:"center" }}>
          <Avatar initials={sitter?.initials||"AR"} color={sitter?.color||S2} size={40}/>
          <div style={{ flex:1 }}>
            <p style={{ fontWeight:700, fontSize:14, color:TX, margin:0 }}>{sitter?.name||"Your Sitter"}</p>
            <p style={{ fontSize:12, color:GN, margin:0 }}>Service in progress</p>
          </div>
          <button
            onClick={()=>window.alert("In-app chat with sitter will be available in a future version.")}
            style={{ width:36, height:36, borderRadius:12, background:PL, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
          >
            <MessageCircle size={16} color={P}/>
          </button>
        </div>

        {/* Progress Steps */}
        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 14px" }}>Booking Progress</h3>
          {steps.map((s,i)=>(
            <div key={i} style={{ display:"flex", gap:14, marginBottom:i<steps.length-1?0:0 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:28, height:28, borderRadius:14, background:s.done?GN:s.active?P:BD, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {s.done ? <Check size={14} color="#fff" strokeWidth={3}/> : s.active ? <div style={{ width:10, height:10, borderRadius:5, background:"#fff" }}/> : <Circle size={10} color="#fff"/>}
                </div>
                {i<steps.length-1 && <div style={{ width:2, height:32, background:s.done?GN:BD, margin:"4px 0" }}/>}
              </div>
              <div style={{ paddingBottom:i<steps.length-1?24:0 }}>
                <p style={{ fontWeight:s.active?700:600, fontSize:14, color:s.active?P:s.done?TX:T3, margin:"0 0 2px" }}>{s.label}{s.active&&" · Now"}</p>
                <p style={{ fontSize:12, color:T2, margin:0 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div style={{ background:"#E8F4F0", borderRadius:18, height:140, marginBottom:14, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize:"20px 20px" }}/>
          <Navigation size={28} color={GN}/>
          <p style={{ fontSize:13, fontWeight:600, color:GN, margin:0 }}>Live Walk Tracking</p>
          <p style={{ fontSize:11, color:T2, margin:0 }}>GPS route updating in real time</p>
        </div>

        {/* Timeline */}
        <div style={{ background:SUR, borderRadius:18, padding:16 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 14px" }}>Activity Timeline</h3>
          {TIMELINE.map((t,i)=>(
            <div key={i} style={{ display:"flex", gap:14, marginBottom:i<TIMELINE.length-1?16:0 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:8, height:8, borderRadius:4, background:P, flexShrink:0, marginTop:4 }}/>
                {i<TIMELINE.length-1 && <div style={{ width:2, flex:1, background:BD, margin:"6px 0", minHeight:20 }}/>}
              </div>
              <div>
                <div style={{ display:"flex", gap:8, alignItems:"baseline" }}>
                  <span style={{ fontSize:12, color:T3 }}>{t.time}</span>
                  <span style={{ fontSize:14, fontWeight:600, color:TX }}>{t.label}</span>
                </div>
                <p style={{ fontSize:13, color:T2, margin:"2px 0 0" }}>{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Complete Service" onClick={()=>go("review")} variant="dark"/>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

function ReviewScreen({ go, state, set }) {
  const { selectedSitter: sitter, selectedPet: pet } = state
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState([])
  const [reviewText, setReviewText] = useState("")
  const [tip, setTip] = useState(0)
  const TAGS = ["Great communicator","My pet loved them","Clean home","Punctual","Would book again"]
  const toggleTag = t => setSelectedTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <div style={{ background:SUR }}>
        <StatusBar/>
        <TopBar title="Leave a Review"/>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"0 20px 100px" }}>
        <div style={{ textAlign:"center", padding:"20px 0 24px" }}>
          <div style={{ width:52, height:52, borderRadius:16, background:S2, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:28 }}>🏠</div>
          <h2 style={{ fontSize:22, fontWeight:800, color:TX, margin:"0 0 4px" }}>{pet?.name||"Your pet"} is home!</h2>
          <p style={{ fontSize:14, color:T2, margin:0 }}>Service completed successfully</p>
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14 }}>
          <p style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 16px", textAlign:"center" }}>How was {pet?.name||"your pet"}'s stay with {sitter?.name?.split(" ")[0]}?</p>
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16 }}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onMouseEnter={()=>setHoverRating(n)} onMouseLeave={()=>setHoverRating(0)} onClick={()=>setRating(n)} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
                <Star size={36} color="#F59E0B" fill={(hoverRating||rating)>=n?"#F59E0B":"transparent"}/>
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:14 }}>
            {TAGS.map(t=>{
              const on=selectedTags.includes(t)
              return <button key={t} onClick={()=>toggleTag(t)} style={{ padding:"8px 14px", borderRadius:100, border:`1.5px solid ${on?P:BD}`, background:on?PL:SUR, color:on?P:TX, fontSize:13, cursor:"pointer", fontFamily:"inherit", fontWeight:on?600:400 }}>{t}</button>
            })}
          </div>
          <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder="Tell others about your experience with this sitter..." style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:`1.5px solid ${BD}`, fontSize:14, fontFamily:"inherit", resize:"none", height:80, outline:"none", boxSizing:"border-box" }}/>
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14 }}>
          <p style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 4px" }}>Add a photo</p>
          <p style={{ fontSize:13, color:T2, margin:"0 0 12px" }}>Share how {pet?.name||"your pet"} is doing</p>
          <button style={{ width:"100%", padding:"20px", borderRadius:12, border:`1.5px dashed ${BD}`, background:S2, display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer" }}>
            <Camera size={24} color={T3}/>
            <p style={{ fontSize:13, color:T2, margin:0 }}>Tap to upload a photo</p>
          </button>
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16 }}>
          <p style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 4px" }}>Leave a tip</p>
          <p style={{ fontSize:13, color:T2, margin:"0 0 14px" }}>100% goes to {sitter?.name}</p>
          <div style={{ display:"flex", gap:8 }}>
            {[0,100,200,500].map(v=>(
              <button key={v} onClick={()=>setTip(v)} style={{ flex:1, padding:"12px 0", borderRadius:12, border:`2px solid ${tip===v?P:BD}`, background:tip===v?P:SUR, color:tip===v?"#fff":TX, fontSize:14, fontWeight:tip===v?700:400, cursor:"pointer", fontFamily:"inherit" }}>{v===0?"None":`₹${v}`}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Submit Review" onClick={()=>go("review-done")} disabled={rating===0}/>
        <p style={{ textAlign:"center", marginTop:10, marginBottom:0 }}><button onClick={()=>go("review-done")} style={{ fontSize:13, color:T3, background:"none", border:"none", cursor:"pointer" }}>Skip for now</button></p>
      </div>
    </div>
  )
}

function ReviewDoneScreen({ go, state }) {
  const { selectedSitter: sitter, selectedPet: pet } = state
  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column" }}>
      <StatusBar/>
      <div style={{ flex:1, overflowY:"auto", padding:"0 20px 100px" }}>
        <div style={{ textAlign:"center", padding:"32px 0 28px" }}>
          <div style={{ width:72, height:72, background:PL, borderRadius:24, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <Award size={36} color={P}/>
          </div>
          <h1 style={{ fontSize:26, fontWeight:800, color:TX, margin:"0 0 6px" }}>Thanks for your review!</h1>
          <p style={{ fontSize:15, color:T2, margin:0, lineHeight:1.6 }}>Your feedback helps pet parents<br/>in your community find great sitters.</p>
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14, display:"flex", gap:14, alignItems:"center" }}>
          <Avatar initials={sitter?.initials||"PS"} color={sitter?.color||S2} size={52}/>
          <div style={{ flex:1 }}>
            <p style={{ fontWeight:700, fontSize:16, color:TX, margin:"0 0 3px" }}>{sitter?.name||"Your Sitter"}</p>
            <div style={{ display:"flex", gap:2 }}>{[1,2,3,4,5].map(n=><Star key={n} size={14} color="#F59E0B" fill="#F59E0B"/>)}</div>
          </div>
          <span style={{ fontSize:12, fontWeight:600, color:GN }}>Review posted</span>
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16, marginBottom:14 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:TX, margin:"0 0 12px" }}>Rebook {sitter?.name?.split(" ")[0]}?</h3>
          <p style={{ fontSize:14, color:T2, margin:"0 0 14px" }}>You and {pet?.name||"your pet"} had a great experience together.</p>
          <Btn label={`Rebook ${sitter?.name?.split(" ")[0]||"Sitter"}`} onClick={()=>go("service-select")}/>
        </div>

        <div style={{ background:SUR, borderRadius:18, padding:16 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:TX, margin:"0 0 6px" }}>Refer a friend</h3>
          <p style={{ fontSize:14, color:T2, margin:"0 0 14px" }}>Give ₹200, Get ₹200 · When they complete their first booking</p>
          <div style={{ background:S2, borderRadius:12, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:15, fontWeight:700, color:P, letterSpacing:2 }}>PETVESTA200</span>
            <button
              onClick={()=>{
                const code = "PETVESTA200"
                if(navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(code)
                  window.alert("Referral code copied!")
                } else {
                  window.alert(`Referral code: ${code}`)
                }
              }}
              style={{ fontSize:13, fontWeight:600, color:P, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit" }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px 28px", background:SUR, borderTop:`1px solid ${BD}` }}>
        <Btn label="Back to Home" onClick={()=>go("home")}/>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

function getInitialState() {
  return {
    phone:"", otpSent:false, otp:"",
    userType:"",
    userName:"",
    location:"", showLocationModal:false,
    serviceType:"sitter", petType:"dog", selectedService:"",
    startDate:"", endDate:"", nights:1,
    userPets: SAVED_PETS,
    selectedPet: SAVED_PETS[0],
    selectedSitter: SITTERS[0],
    selectedAddons:[], bookingTotal:0, finalTotal:0,
    careDetails:{}, bookingDone:false,
    bookings:[],
  }
}

export default function App() {
  const [screen, setScreen] = useState("splash")
  const [state, setState] = useState(getInitialState)

  const set = (key, value) => setState(p => ({ ...p, [key]: value }))
  const reset = () => setState(getInitialState())

  const go = (nextScreen) => {
    // Auto-show location modal just before entering home if not set
    if (nextScreen === "home" && !state.location) {
      setState(p => ({ ...p, showLocationModal: true }))
    }
    setScreen(nextScreen)
  }

  const props = { go, state, set, reset }

  const SCREENS = {
    "splash": <SplashScreen {...props}/>,
    "auth": <AuthScreen {...props}/>,
    "home": <HomeScreen {...props}/>,
    "search": <SearchScreen {...props}/>,
    "service-select": <ServiceSelectScreen {...props}/>,
    "pet-profile": <PetProfileScreen {...props}/>,
    "pet-form": <PetFormScreen {...props}/>,
    "sitters-list": <SittersListScreen {...props}/>,
    "bookings": <BookingsScreen {...props}/>,
    "messages": <MessagesScreen {...props}/>,
    "profile": <ProfileScreen {...props}/>,
    "sitter-profile": <SitterProfileScreen {...props}/>,
    "booking-confirm": <BookingConfirmScreen {...props}/>,
    "payment": <PaymentScreen {...props}/>,
    "care-details": <CareDetailsScreen {...props}/>,
    "all-set": <AllSetScreen {...props}/>,
    "live-tracking": <LiveTrackingScreen {...props}/>,
    "review": <ReviewScreen {...props}/>,
    "review-done": <ReviewDoneScreen {...props}/>,
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0F0F0F", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px 0", fontFamily:"'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
        input, textarea, select { font-family: 'DM Sans', -apple-system, sans-serif !important; }
        button { font-family: 'DM Sans', -apple-system, sans-serif !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
      <div style={{ width:390, height:844, background:"#FAF7F3", borderRadius:54, overflow:"hidden", position:"relative", boxShadow:"0 40px 80px rgba(0,0,0,0.6), 0 0 0 2px #333, inset 0 0 0 1px rgba(255,255,255,0.1)" }}>
        {/* Notch */}
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:120, height:34, background:"#0F0F0F", borderRadius:"0 0 20px 20px", zIndex:999 }}/>
        <div style={{ height:"100%", position:"relative" }}>
          {SCREENS[screen] || SCREENS["home"]}
        </div>
      </div>
    </div>
  )
}
