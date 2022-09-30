import React, { useState, useEffect } from 'react'
import Header from "./Header"
import { useSelector } from "react-redux";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom"
import styled from "styled-components";
import { mobile } from "../responsive";
import products from "../store/reducers/ProductsReducer"





const Container = styled.div`
display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Filter = styled.div`
  margin: 80px;
  display: flex;
  
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled('li')`
list-style: none;
margin-bottom: 0.8em;
`;
const button = styled("div")`
margin-bottom: 0.8em;
padding: 0.4em 2em 0.4em 1em;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
font-weight: 500;
font-size: 1rem;
color: #3faffa;
background: #ffffff;
`;
const DropdownListContainer = styled('div')``

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #3faffa;
  background: #ffffff;
`;
const DropdownContainer = styled('div')`
  width: 10.5em;
  margin: 0 auto;
`;

const DropdownList = styled('ul')`
padding: 0;
margin: 0;
padding-left: 1em;
background: #ffffff;
border: 2px solid #e5e5e5;
box-sizing: border-box;
color: #3faffa;
font-size: 1rem;
font-weight: 500;
&:first-child {
  padding-top: 0.8em;
}`;

const Home = () => {
    const { products } = useSelector(state => state.ProductsReducer);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const [product, setProduct] = useState(products)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setsearchTerm] = useState("")

    //  const products = location.pathname.split("/")[2];

    const filterResult = (colorItem) => {
        const result = products.filter((curDate) => {
            return curDate.color === colorItem
        })
        setProduct(result);
    }
    const filterRes = (colorItem) => {
        const result = products.filter((curDate) => {
            return curDate.size === colorItem
        })
        setProduct(result);
    }



    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    const toggling = () => setIsOpen(!isOpen);

    // const onOptionClicked = value => () => {
    //     setSelectedOption(value);
    //     setIsOpen(false);
    //     console.log(selectedOption);
    //   };


    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="new">
                        <Container>
                            <FilterContainer>
                                <Filter>
                                    <FilterText>Color:</FilterText>
                                    <DropdownContainer>

                                        <DropDownHeader onClick={toggling} disabled>{selectedOption || "Color"}</DropDownHeader>
                                        {isOpen && (
                                            <DropdownListContainer>
                                                <DropdownList name="color " onChange={handleFilters}>


                                                    <Option onClick={() => filterResult('black')}>black</Option>
                                                    <Option onClick={() => filterResult('blue')}>blue</Option>
                                                    <Option onClick={() => filterResult('grey')}>grey</Option>
                                                </DropdownList>
                                            </DropdownListContainer>
                                        )}
                                    </DropdownContainer>

                                    <FilterText>Size:</FilterText>

                                    <DropdownContainer>

                                        <DropDownHeader onClick={toggling} disabled>{selectedOption || "Size"}</DropDownHeader>
                                        {isOpen && (
                                            <DropdownListContainer>
                                                <DropdownList name="size">


                                                    <Option onClick={() => filterRes('S')}>S</Option>
                                                    <Option onClick={() => filterRes('M')}>M</Option>
                                                    <Option onClick={() => filterRes('L')}>L</Option>
                                                </DropdownList>
                                            </DropdownListContainer>
                                        )}
                                    </DropdownContainer>
                                </Filter>
                                <Filter>
                                    <FilterText>Sort Products:</FilterText>
                                    <DropdownContainer>
                                        <DropDownHeader onClick={toggling} disabled>{selectedOption || "Sort"}</DropDownHeader>
                                        {isOpen && (
                                            <DropdownListContainer>
                                                <DropdownList onChange={(e) => setSort(e.target.value)}>
                                                    <Option value="newest">Newest</Option>
                                                    <Option value="asc">Price (asc)</Option>
                                                    <Option value="desc">Price (desc)</Option>
                                                </DropdownList>
                                            </DropdownListContainer>
                                        )}
                                    </DropdownContainer>

                                </Filter>

                            </FilterContainer>

                            <products products={products} filters={filters} sort={sort} />
                        </Container>
                    </div>
                   



                    {product.map(value => {
                        const { id, image, price, color, size, name } = value;
                    
                        return (

                            <div className="col-3" key={id}>

                                <div className="product">
                                    <div className="product__img">
                                        <Link to={`/details/${id}`}><img src={`/images/${image}`} alt="image name" /></Link>

                                    </div>

                                    <div className="product__name">
                                        {name}
                                    </div>
                                    <div className="row">
                                        <div className="col-6">

                                        </div>
                                        <div className="col-6">
                                            <div className="product__discount__price">
                                                {currencyFormatter.format(price, { code: 'INR' })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Home
