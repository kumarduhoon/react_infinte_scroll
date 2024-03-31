import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Card from "../components/Card/Card";

const InfiniteScrollExample = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(2);
    const loaderRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    "https://api.escuelajs.co/api/v1/products?offset=10&limit=12"
                );
                setItems(response.data);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        getData();
    }, []);

    const fetchData = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        await axios
            .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=12`)
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data]);
            })
            .catch((err) => console.log(err));

        setIndex((prevIndex) => prevIndex + 1);

        setIsLoading(false);
    }, [index, isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                fetchData();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchData]);
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className="grid grid-cols-3">
                        {items.map((item) => (
                            <Card item={item} />
                        ))}
                    </div>
                </div>
                <div ref={loaderRef}>{isLoading && <div>Loading...</div>}</div>
            </div>
        </>
    )
}

export default InfiniteScrollExample