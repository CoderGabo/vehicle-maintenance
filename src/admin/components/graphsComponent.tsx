import Plot from 'react-plotly.js'
import { Grid } from '@mui/material';

import { GraphsComponentProps } from '../../interface/graphs.interface'


export const GraphsComponent: React.FC<GraphsComponentProps> = ({ serviceData, gananciaData, maintenanceData, loading }) => {

    return (
        <Grid container spacing={2}>
            {/* Primer gráfico en la fila superior */}
            <Grid item xs={12}>
                <div style={{ marginBottom: '20px' }}>
                    {loading ? (
                        <div style={{color: '#616161'}}>Cargando...</div>
                    ) : (
                        <>
                            {serviceData && (
                                <Plot
                                    data={serviceData.data}
                                    layout={{
                                        ...serviceData.layout,
                                        margin: { t: 50, l: 50, r: 50, b: 100 }
                                    }}
                                    style={{ width: '100%', height: '600px' }}
                                    useResizeHandler={true}
                                />
                            )}
                        </>
                    )}
                </div>
            </Grid>
            {/* Los otros dos gráficos en la fila inferior */}
            <Grid item xs={12} sm={6}>
                <div style={{ marginBottom: '20px' }}>
                    {loading ? (
                        <div style={{color: '#616161'}}>Cargando...</div>
                    ) : (
                        <>
                            {gananciaData && (
                                <Plot
                                    data={gananciaData.data}
                                    layout={{
                                        ...gananciaData.layout
                                    }}
                                    style={{ width: '100%', height: '600px' }}
                                    useResizeHandler={true}
                                />
                            )}
                        </>
                    )}
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <div style={{ marginBottom: '20px' }}>
                    {loading ? (
                        <div style={{color: '#616161'}}>Cargando...</div>
                    ) : (
                        <>
                            {maintenanceData && (
                                <Plot
                                    data={maintenanceData.data}
                                    layout={{
                                        ...maintenanceData.layout
                                    }}
                                    style={{ width: '100%', height: '600px' }}
                                    useResizeHandler={true}
                                />
                            )}
                        </>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}
