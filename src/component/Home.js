
import Notes from './Notes'
export default function Home(props) {
  const  {showalert}=props

 return (
        <div>
         
         {/* <div className="container my-4">
            <h2>Add note</h2>
            <form className="my-4">
                <div className="mb-3">
                    <label htmlFor="tittle" className="form-label">tittle</label>
                    <input type="text" className="form-control" id="tittle" name='desc' aria-describedby="emailHelp" />
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">description</label>
                    <input type="desc" className="form-control" id="desc" name='desc' />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
                </form>
                </div> */}

           <Notes showalert={showalert}/>
            </div>
    )
}
