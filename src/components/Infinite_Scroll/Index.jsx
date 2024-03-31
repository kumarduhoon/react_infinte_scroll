import React from 'react'
import axios from 'axios'
import Card from '../Card/Card'
import InfiniteScroll from 'react-infinite-scroll-component';

function Index() {
    const [data, setData] = React.useState([])
    const [hasMore, setHasMore] = React.useState(true);
    const [index, setIndex] = React.useState(2);

    //  this is for how many data you want to on screen when you land first time on the page
    async function getData() {
        try {
            const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=10&limit=6`)
            setData(res.data)
        } catch (error) {
            throw new Error
        }
    }
    React.useEffect(() => {
        getData()
    }, [])

    // this function is trigger when scroll and reacted on first limit for example here is 6 item mean when we reached at the end of 6 th item then i will trigger again for next 6 item
    const fetchMoreData = () => {
        axios
            .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=6`)
            .then((res) => {
                setData((prevItems) => [...prevItems, ...res.data]);
                // here check the data is coming in every trigger then set the value of hasMore is true and false if value is true then it will be trigger again otherwise no 
                res.data.length > 0 ? setHasMore(true) : setHasMore(false);
            })
            .catch((err) => console.log(err));
        // this is used to increase the page or index for get the next data not same 
        setIndex((prevIndex) => prevIndex + 1);
    };
    return (
        <div>
            <InfiniteScroll
                dataLength={data?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div>Loading...</div>}
            >
                <div className="grid grid-cols-3">
                    {
                        data.length > 0 && data.map((item) => {
                            return (
                                <Card item={item} />
                            )
                        })
                    }
                </div>
            </InfiniteScroll>
            {/* <Card data={data} /> */}
        </div>
    )
}

export default Index