import * as React from 'react';



export default function TableGridCupom(props) {

    /*function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridColumnsToolbarButton/>
                <GridFilterToolbarButton/>
            </GridToolbarContainer>
        );
    }

    const useStyles = makeStyles(() => ({
        root: {
            alignItems: 'center',
            lineHeight: '24px',
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            '& .cellValue': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
        },
    }));

    const GridCellExpand = React.memo(function GridCellExpand(props) {
        const {width, value} = props;
        const wrapper = React.useRef(null);
        const cellDiv = React.useRef(null);
        const cellValue = React.useRef(null);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const classes = useStyles();
        const [showFullCell, setShowFullCell] = React.useState(false);
        const [showPopper, setShowPopper] = React.useState(false);

        const handleMouseEnter = () => {
            const isCurrentlyOverflown = isOverflown(cellValue.current);
            setShowPopper(isCurrentlyOverflown);
            setAnchorEl(cellDiv.current);
            setShowFullCell(true);
        };

        const handleMouseLeave = () => {
            setShowFullCell(false);
        };

        React.useEffect(() => {
            if (!showFullCell) {
                return undefined;
            }

            function handleKeyDown(nativeEvent) {
                // IE11, Edge (prior to using Bink?) use 'Esc'
                if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                    setShowFullCell(false);
                }
            }

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [setShowFullCell, showFullCell]);

        return (
            <div
                ref={wrapper}
                className={classes.root}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={cellDiv}
                    style={{
                        height: 1,
                        width,
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                    }}
                />
                <div ref={cellValue} className="cellValue">
                    {value}
                </div>
                {showPopper && (
                    <Popper
                        open={showFullCell && anchorEl !== null}
                        anchorEl={anchorEl}
                        style={{width, marginLeft: -17}}
                    >
                        <Paper
                            elevation={1}
                            style={{minHeight: wrapper.current.offsetHeight - 3, margin: 5}}
                        >
                            <div style={{padding: 8, justifyContent: "flex-start"}}>
                                <Typography variant="caption"
                                            style={{align: "right"}}>
                                    {value}
                                </Typography>
                                <br/>
                            </div>

                        </Paper>
                    </Popper>
                )}
            </div>
        );
    });

    GridCellExpand.propTypes = {
        value: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
    };

    function renderCellExpand(params) {
        return (
            <GridCellExpand
                value={params.value ? params.value.toString() : ''}
                width={params.colDef.width}
            />
        );
    }

    renderCellExpand.propTypes = {
        /!**
         * The column of the row that the current cell belongs to.
         *!/
        colDef: PropTypes.any.isRequired,
        /!**
         * The cell value, but if the column has valueGetter, use getValue.
         *!/
        value: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.number,
            PropTypes.object,
            PropTypes.string,
            PropTypes.bool,
        ]),
    };


    // noinspection JSAnnotator
    const columns = [
        {field: "id", headerName: "ID Livro", width: 400, renderCell:renderCellExpand},
        {field: "cupom", headerName: "Cupom", width: 190, renderCell: renderCellExpand,},
        {field: "valor", headerName: "Valor", width: 190, renderCell: renderCellExpand,},
        {field: "qtde", headerName: "Quantidade", width: 190, renderCell: renderCellExpand,},
        {field: "validade", headerName: "Validade", width: 190, renderCell: renderCellExpand,},
    ];
    const [rows, setRows] = useState(props.rows);
    const [deletedRows, setDeletedRows] = useState([]);

    const handleRowSelection = (e) => {
        setDeletedRows([...deletedRows, ...rows.filter((r) => r.id === e.data.id)]);
    };

    const handlePurge = () => {
        setRows(
            rows.filter((r) => deletedRows.filter((sr) => sr.id === r.id).length < 1)
        );
    };*/
    return (
        <div>

        </div>
    );
}

