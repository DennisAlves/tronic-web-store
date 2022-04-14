import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ClientData from "../ClientData/ClientData";
import AdressData from "../AdressData/AdressData";
import PhoneData from "../PhoneData/PhoneData";
import ClienteDocumentData from "../ClientDocumentData/ClienteDocumentData";
import CardData from "../CardData/CardData";
import PurchaseData from "../PurchaseData/PruchaseData";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box m={1} display="flex" flexDirection="row">
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: "80vh",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function AbasDados(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Dados Cliente" {...a11yProps(0)} />
                <Tab label="Endereços" {...a11yProps(1)} />
                <Tab label="Telefones" {...a11yProps(2)} />
                <Tab label="Documentos" {...a11yProps(3)} />
                <Tab label="Cartões" {...a11yProps(4)} />
                <Tab label="Compras" {...a11yProps(5)} />
                <Tab label="Cupons" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ClientData
                    id={props.clienteId}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AdressData
                    id={props.clienteId}
                    tipoLogradouroList={props.tipoLogradouroList}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PhoneData
                    id={props.clienteId}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ClienteDocumentData
                    id={props.clienteId}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <CardData
                    id={props.clienteId}
                />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <PurchaseData
                    id={props.clienteId}
                />
            </TabPanel>
            <TabPanel value={value} index={6}>

            </TabPanel>
        </div>
    );
}


