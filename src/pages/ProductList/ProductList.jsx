import { Link } from "react-router-dom";
import {
  Card,
  Image,
  Input,
  Text,
  Group,
  Badge,
  Button,
  Container,
  SimpleGrid,
  Box,
} from "@mantine/core";
import classes from "./ProductList.module.css";
import ProductSearch from "./ProductSearch";
import useProducts from "./hooks/useProducts";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ProductList() {
  const [datas, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products`);
        setData(response?.data?.products);
      } catch (error) {
        console.log("error > ", error);
      }
    }
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/categories`);
        // console.log(response.data);
        setCategory(response.data);
        // console.log(category);
      } catch (error) {
        console.log("error > ", error);
      }
    }
    fetchProducts();
    fetchCategory();
  }, []);

  const searching = async (keyword) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/search`, {
        params: {
          q: keyword,
        },
      });
      // console.log(response.data.products);
      setData(response.data.products);
    } catch (error) {

      console.log("error bang > ", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searching(search);
    setSearch('');
  };

  const handleCategory = async(e) =>{
    let cat = e.target.value;
    // console.log(cat);
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${cat}`);
      // console.log(response.data);
      setData(response.data.products);
    } catch (error) {

      console.log("error bang > ", error);
    }
  }

  const renderProducts = () =>
    datas &&
    datas.length > 0 &&
    datas.sort((a,b) => a.title.localeCompare(b.title)).map((product) => (
      
      <Card key={product.id} withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image
            src={product.images[0]}
            alt="Tesla Model S"
            w={"100%"}
            h={"100%"}
            fit="contain"
          />
        </Card.Section>
        <Group justify="space-between" mt="md">
          <div>
            <Text fw={500}>{product.title}</Text>
            <Text fz="xs" c="dimmed">
              Free recharge at any station
            </Text>
          </div>
          <Badge variant="outline">25% off</Badge>
        </Group>
        <Card.Section className={classes.section}>
          <Group gap={30} justify="space-between" px={15}>
            <div>
              <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                {product.price}
              </Text>
            </div>
            <Link to={`/products/${product.id}`}>
              <Button radius="xl" style={{ flex: 1 }}>
                Beli
              </Button>
            </Link>
          </Group>
        </Card.Section>
      </Card>
    ));
    
  return (
    <Container py="xl">
      <Box mb={15}>
        <form onSubmit={handleSearch}>
      <input size="lg" type="text" placeholder="Cari produk" value={search} onChange={(e)=> setSearch(e.target.value)} />
      <button type="submit">Cari</button>        
        </form>
    </Box>
      <Box mb={15}>
        <Text>Tersedia {datas.length} produk</Text>
      </Box>
      <select name="category" onChange={handleCategory}>
        <option defaultValue="pilih">Pilih Kategori</option>
        
        { category.map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{renderProducts()}</SimpleGrid>
    </Container>
  );
}
