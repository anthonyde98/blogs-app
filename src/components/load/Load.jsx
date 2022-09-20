import "./load.css"

export default function Load() {
  return (
    <div className="load">
        <div className="spinner-container">
            <div className="spinner-border text-info spinner" role="status"> 
                <span className="visually-hidden">Loading...</span> 
            </div> 
        </div>
    </div>
  )
}
