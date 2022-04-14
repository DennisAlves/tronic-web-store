import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import RedCardInfo from "../DashboardData/InfoCards/RedCardInfo"
import BlueCardInfo from "../DashboardData/InfoCards/BlueCardInfo";
import OrangeCardInfo from "../DashboardData/InfoCards/OrangeCardInfo"
import GreenCardInfo from "../DashboardData/InfoCards/GreenCardInfo"
import YellowCardInfo from "../DashboardData/InfoCards/YellowCardInfo"
import styled from "styled-components";
import {TableGridVendas} from "../TableGrid/TableGridVendas";
import {TableGridEstoque} from "../TableGrid/TableGridEstoque";
import Typography from "@material-ui/core/Typography";
import AddBookPage from "../AddBookPage/AddBookPage";
import CadastroDeFornecedor from "../CadastroDeFornecedor/CadastroDeFornecedor";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import CreateCupom from "../CreateCupom/CreateCupom";
import TableGridClientes from "../TableGrid/TableGridClientes";
import TableGridCupom from "../TableGrid/TableGridCupom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`
const WrapperCard = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
`
const GridWrapper = styled.div`
  margin: 12px;
`


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
        minHeight: "100%",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: "fit-content",
    },
}));

/**
 * Props AbasDadosDashboard
 *redCardTopText
 *redCardMidText
 *redCardBottomText
 *blueCardTopText
 *blueCardMidText
 *blueCardBottomText
 *yellowCardTopText
 *yellowCardMidText
 *yellowCardBottomText
 *orangeCardTopText
 *orangeCardMidText
 *orangeCardBottomText
 *greenCardTopText
 *greenCardMidText
 *greenCardBottomText
 *greenCardBottomText
 *dataVendas
 *rowsDataVendas
 */
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
                <Tab label="Fluxo de caixa" {...a11yProps(0)} />
                <Tab label="Vendas" {...a11yProps(1)} />
                <Tab label="Estoque" {...a11yProps(2)} />
                <Tab label="Cupons" {...a11yProps(3)} />
                <Tab label="Clientes" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Wrapper>
                    <WrapperCard>

                        {props.cardList && props.cardList.map((card, index) => {
                            switch (card.color) {
                                case 'green':
                                    return (
                                        <GreenCardInfo key={index}
                                                       topText={card.topText}
                                                       midText={card.midText}
                                                       bottomText={card.bottomText}
                                        />
                                    )
                                case 'yellow':
                                    return (
                                        <YellowCardInfo key={index}
                                                        topText={card.topText}
                                                        midText={card.midText}
                                                        bottomText={card.bottomText}
                                        />
                                    )
                                case 'red':
                                    return (
                                        <RedCardInfo key={index}
                                                     topText={card.topText}
                                                     midText={card.midText}
                                                     bottomText={card.bottomText}
                                        />
                                    )
                                case 'orange':
                                    return (
                                        <OrangeCardInfo key={index}
                                                        topText={card.topText}
                                                        midText={card.midText}
                                                        bottomText={card.bottomText}
                                        />
                                    )
                                case 'blue':
                                    return (
                                        <BlueCardInfo key={index}
                                                      topText={card.topText}
                                                      midText={card.midText}
                                                      bottomText={card.bottomText}
                                        />
                                    )
                                default:
                                    return (
                                        <Typography key={index} variant="body1" color="textPrimary" gutterBottom>
                                            Sem dados
                                        </Typography>
                                    )
                            }

                        })}
                    </WrapperCard>
                </Wrapper>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GridWrapper>
                    <TableGridVendas
                        rows={props.rowsDataVendas}
                    />
                </GridWrapper>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GridWrapper>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography className={classes.heading}>Tabela de Produtos</Typography>
                        </AccordionSummary>

                        <TableGridEstoque
                            rows={props.rowsDataEstoque}
                        />

                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography className={classes.heading}>Cadastro De livro</Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <AddBookPage/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography className={classes.heading}>Cadastro de fornecedor</Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <CadastroDeFornecedor/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography className={classes.heading}>Cadastro de Categoria</Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label="Nova categoria"
                            />
                            <Button>Salvar</Button>
                        </AccordionDetails>
                    </Accordion>


                </GridWrapper>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <GridWrapper>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography className={classes.heading}>Tabela de Cupons</Typography>
                        </AccordionSummary>

                        <TableGridCupom
                            rows={props.rowsCupom}
                        />
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography className={classes.heading}>Cadastro De Cupom</Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <CreateCupom
                                cupons={props.cupons}
                            />
                        </AccordionDetails>
                    </Accordion>
                </GridWrapper>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <GridWrapper>
                    <TableGridClientes
                        rows={props.rowsCliente}
                    />
                </GridWrapper>
            </TabPanel>
        </div>
    );
}


