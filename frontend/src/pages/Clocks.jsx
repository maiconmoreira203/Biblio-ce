import React, {useState, useEffect} from 'react'

const defaultZones = ['UTC','America/Sao_Paulo','Europe/London','America/New_York','Asia/Tokyo']

function ClockCard({tz, onRemove}){
  const [time, setTime] = useState('--:--:--')
  const [dateStr, setDateStr] = useState('---')

  useEffect(()=>{
    function tick(){
      const now = new Date()
      try{
        const fmtTime = new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:tz}).format(now)
        const fmtDate = new Intl.DateTimeFormat(undefined,{weekday:'short',day:'2-digit',month:'short',year:'numeric',timeZone:tz}).format(now)
        setTime(fmtTime)
        setDateStr(fmtDate)
      }catch(e){
        setTime('N/A')
      }
    }
    tick()
    const id = setInterval(tick,1000)
    return ()=>clearInterval(id)
  },[tz])

  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <strong>{tz}</strong>
        <button onClick={()=>onRemove(tz)}>Remover</button>
      </div>
      <div style={{fontSize:28,fontWeight:700,marginTop:8}}>{time}</div>
      <div style={{color:'#9fb0c7'}}>{dateStr}</div>
    </div>
  )
}

export default function Clocks(){
  const [zones, setZones] = useState(()=>{
    // trazer do localStorage se tiver
    try{
      const raw = localStorage.getItem('biblio_zones')
      if(raw) return JSON.parse(raw)
    }catch(e){}
    return defaultZones
  })
  const [selectList, setSelectList] = useState([])

  useEffect(()=>{
    try{
      if(typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function'){
        setSelectList(Intl.supportedValuesOf('timeZone'))
      }else{
        setSelectList(['UTC','America/Sao_Paulo','Europe/London','America/New_York','Asia/Tokyo','Australia/Sydney'])
      }
    }catch(e){
      setSelectList(['UTC','America/Sao_Paulo','Europe/London'])
    }
  },[])

  useEffect(()=>{localStorage.setItem('biblio_zones', JSON.stringify(zones))},[zones])

  function addZone(tz){
    if(!tz || zones.includes(tz)) return
    setZones(prev=>[...prev, tz])
  }
  function removeZone(tz){
    setZones(prev=>prev.filter(z=>z!==tz))
  }

  return (
    <div>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <select id="tzselect" style={{padding:8,borderRadius:8}}>
          {selectList.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={()=>{const v=document.getElementById('tzselect').value; addZone(v)}}>Adicionar</button>
        <button onClick={()=>{setZones(defaultZones)}}>Restaurar</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12,marginTop:12}}>
        {zones.map(z=> <ClockCard key={z} tz={z} onRemove={removeZone} />)}
      </div>
    </div>
  )
}
