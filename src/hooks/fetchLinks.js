import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import axios from 'axios';
export const useFetchLinks = () => {
    const { getCurrentUser, setLoading,loading,flag,setFlag } = useAuth();
    const id = getCurrentUser()._id;
    const [allLinks, setAllLinks] = useState([]);

    useEffect(() => {
        const fetchAllLinks = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5555/links/getAllLinks/${id}`);
                if (res.status === 200) {
                    console.log(res.data);
                    setAllLinks(res.data.allLinks);
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchAllLinks();
    }, [flag]);

    return { allLinks };
}