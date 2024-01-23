import React from 'react';
import { Link } from 'react-router-dom';
import {
 Container,
 Title,
 Button,
 Group,
 Text,
 List,
 ThemeIcon,
 rem,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './Home.module.css';

export default function Home() {
 return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Selamat Datang</span> <br /> di Tofasah
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>
          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                 style={{ width: rem(12), height: rem(12) }}
                 stroke={1.5}
                />
              </ThemeIcon>
            }>
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all
              components and hooks export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you
              can use Mantine in any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when
              user navigates with keyboard
            </List.Item>
          </List>
          <Group mt={30}>
            <Link to="/products">
              <Button radius="xl" size="md" className={classes.control}>
                Telusuri Toko
              </Button>
            </Link>
            <a href="https://wa.me/6282361400891" target="_blank" rel="noopener noreferrer">
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                Hubungi Kami
              </Button>
            </a>
          </Group>
        </div>
      </div>
    </Container>
 );
}