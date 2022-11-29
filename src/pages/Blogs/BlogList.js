import React, {useState, useEffect} from 'react';
import '../../assets/Styles/BlogList.scss';
import Card from '../../components/Card/Card';
import Blogs from '../../pages/Blogs/Blogs';

import BlogService from '../../services/BlogService';

const BlogList =()=>{

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [fullPage, setFullPage] = useState(9);

    useEffect(()=>{

        const fetchDetails = async(e)=>{
          setLoading(true);

          const response = await BlogService.fetchBlogs();
          console.log(response);
          if  (response.status === 200){
            setPosts(response.data);
            setLoading(false);
            setShowPreviousButton(false);
          }
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
              <section className="pagination">
              <div>
                    <button className="buttonsPreAndNext" disabled={!showPreviousButton} onClick={handlePreviousButton}>Previous</button>
                    <button className="buttonsNumbers" >{currentPage}/{fullPage}</button>
                    <button className="buttonsPreAndNext" disabled={!showNextButton}  onClick={handleNextButton}>Next</button>
              </div>  
            </section>
            </Card>
            
         
    );
}

export default BlogList;