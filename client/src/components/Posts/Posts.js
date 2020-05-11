import React, {useState, useEffect} from 'react'
import { useLocation, useParams} from 'react-router-dom';
import PostForm from './PostForm';

function Posts() {
    const [ walkPost, setWalkPost ] = useState({});
    const [ showForm, setShowForm ] = useState(false);
    const[ replyResult, setReplyResult ] = useState( [] )
    const[ numberReply, setNumberReply] = useState()
    const[ myLike, setMyLike ] = useState();
    let counter;

    let params = useParams();
    let{ handle }=useParams();
    // console.log(handle) // console.log(params)
    let location = useLocation();
    // console.log(location); // 
    // console.log(location.state.id)
    let postId = location.state.id;

    async function loadPage(){
        const apiGetWalkPost = await fetch(`/api/walkpost/${postId}`).then( result => result.json() )
        // console.log(apiGetWalkPost)
        setWalkPost(apiGetWalkPost)

        const apiGetReply = await fetch(`/api/replydata/${postId}`).then( result => result.json() )
        setReplyResult(apiGetReply)
        let replyArray = apiGetReply.length;
        setNumberReply(replyArray);
        setMyLike(10);
       

    }
    // console.log(replyResult);
    function submitForm(e){
        e.preventDefault();
        setShowForm(false);
    }
    // console.log(walkPost)
    useEffect( function(){
        loadPage();
    }, [] );

    async function handleLike(e){
        e.preventDefault();
        counter = myLike
        counter++;
        setMyLike(counter)
       
        const apiReply = await fetch(`/api/counter/${postId}`, 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myLike)
          }).then( result=>result.json())   
          console.log(apiReply)
    }
        
    console.log(myLike)

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mx-auto" style={{height: "50px", backgroundColor: "#9f6934", padding: "0", margin: "0"}}>
                    <h2 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Forum</h2>
                </div>
                <div class="col-lg-12 mx-auto">
                    <div class="row justify-content-center">
                        <div class="col-10">
                            <h2 class="my-4">{walkPost.title}</h2>
                        </div>
                        <div class="col-10" style={{border: "1px solid #9f6934"}}>
                            <div class="row">
                                <div class="">
                                    <p>Post by:{walkPost.name}</p>
                                    <small>{walkPost.createdAt}</small><br/>
                                    <small>Replies:{numberReply}</small>
                                </div>            
                            </div>
                            <div class="row mt-4">
                                <p>{walkPost.message}</p>
                            </div>
                            <div class="row mt-4">
                                <button type="submit" onClick={e => {handleLike()}}>Like</button><span>{myLike}</span>
                            </div>
                            
                        </div>
                        <div class="col-10 mx-auto" style={{border: "1px solid #9f6934"}}>
                            <button onClick={() => setShowForm(true)} style={{display:"block"}}>Reply</button></div>
                            { showForm ?  <PostForm submitForm={submitForm} walkPost={walkPost} loadPage={loadPage}/> : ''}
                    </div>    
                </div>    
            </div>
            <div class="row mt-4">
                <div class="col-lg-12">
                {replyResult.map( reply => <div class="row justify-content-center mb-2">
                        <div class="col-lg-10" style={{background: "#9f6934", border:'1px solid #9f6934'}}>
                            {reply.createdAt}
                        </div>
                        <div class="col-lg-10" style={{border:'1px solid #9f6934'}}>
                            <div class="row">
                                <div class="col-lg-6">{reply.user.name}</div>
                                <div class="col-lg-4">User Details</div>
                            </div>        
                        </div>
                        <div class="col-lg-10 mx-auto" style={{border:'1px solid #9f6934', }}>
                            {reply.message}
                        </div> 
                    </div>)}
                </div>    
            </div>
                        
        </div>    
    )
}

export default Posts
