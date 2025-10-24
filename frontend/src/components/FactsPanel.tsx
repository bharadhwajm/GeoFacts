import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

interface FactsInter{
    country:String | null;
}

const FactsPanel:React.FC<FactsInter>=({country})=>{
    const [facts,setFacts]=useState<JSON|null>(null)
    const [loading,setLoading]=useState<Boolean>(false)
    const [showContent,setShowContent]=useState<any>(null)
    const [activeKey,setActiveKey]=useState<String|null>(null)
    const apiUrl=import.meta.env.BACKEND_URL

    async function getFacts(){
        const response=await fetch(`${apiUrl}/getContent?country=${country}`)
        const data=await response.json()
        setFacts(JSON.parse(data))
        console.log(data)
        setLoading(false)
    }

    useEffect(()=>{
        console.log(country)
        if (country){
            setShowContent(null)
            setActiveKey(null)
            setFacts(null)
            setLoading(true)
            getFacts()
        }
    },[country])

    return (
        <div className="fixed top-0 right-0 z-500 p-2 m-2 w-1/3 text-white">
            { facts ?
                (
                <>
                <div className="bg-black opacity-60 rounded-xl text-center">
                    <p className="font-bold">Information on {country}</p>
                    {
                        Object.entries(facts).map(([key,val])=>(
                            <button key={key} onClick={()=>{
                                setShowContent(val)
                                setActiveKey(key)
                            }} className={`rounded-lg p-2 m-2 ${activeKey==key?"bg-green-500":"bg-red-500"}`}>{key}</button>
                        ))
                    }
                </div>
                { showContent &&
                    (<div className="bg-black opacity-60 rounded-xl max-h-[80vh] mt-2 overflow-y-auto p-2">
                        {
                            Object.entries(showContent).map(([key,val])=>(
                                <>
                                    <p className="font-bold">{key}:</p>
                                    <p>{val as string}</p>
                                    <br />
                                </>
                            ))
                        }
                    </div>)
                }
                </>
                ):(!loading &&
                        (<div className="bg-black rounded-xl opacity-60 p-2 text-center">Click on a country to learn</div>)
                )
            }
            {loading && (
                <div className="flex justify-center bg-black rounded-xl opacity-60 p-2">
                    <LoaderCircle className="animate-spin mr-2"/>
                    <p>Getting information on {country}</p>
                </div>
            )}
        </div>
    )

}
export default FactsPanel;