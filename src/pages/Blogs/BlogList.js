import React, {useState, useEffect} from 'react';
import classes from './BlogList.module.css';
import Card from '../../components/Card/Card';
import Blogs from '../../pages/Blogs/Blogs';

const BlogList =()=>{

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [fullPage, setFullPage] = useState(9);

    useEffect(()=>{

        const fetchDetails = async()=>{
          setLoading(true);
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts'
          );

          const responseData = await response.json();

          setPosts(responseData);
          setLoading(false);
          setShowPreviousButton(false);

          console.log(responseData);

        }
        fetchDetails();
    }, []);

      const indexOfLastPost = currentPage * postPerPage;
      const indexOfFirstPost = indexOfLastPost - postPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handleNextButton = (event, value) => {
      setCurrentPage(currentPage+1);

      if(currentPage === currentPage){
        setShowPreviousButton(true);
      }

      if(currentPage === fullPage-1){
        setShowNextButton(false);
      }
      
    };

    const handlePreviousButton = (event, value) => {
      setCurrentPage(currentPage-1);
      
      if(currentPage === fullPage){
        setShowNextButton(true);
      }

      if(currentPage === fullPage-7){
        setShowPreviousButton(false);
      }
    };

    return(
            <Card>
              <Blogs posts={currentPosts} loading={loading}/>
              <section className={classes.pagination}>
              <div>
                    <button className={classes.buttonsPreAndNext} disabled={!showPreviousButton} onClick={handlePreviousButton}>Previous</button>
                    <button className={classes.buttonsNumbers}>{currentPage}/{fullPage}</button>
                    <button className={classes.buttonsPreAndNext} disabled={!showNextButton}  onClick={handleNextButton}>Next</button>
              </div>  
            </section>
            </Card>
            
         
    );
}

export default BlogList;