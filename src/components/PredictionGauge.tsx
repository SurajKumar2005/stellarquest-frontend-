import GaugeChart from 'react-gauge-chart';

interface PredictionGaugeProps {
    confidence: number;
}

const PredictionGauge = ({ confidence }: PredictionGaugeProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full mt-6">
            <GaugeChart
                id="confidence-gauge"
                nrOfLevels={20}
                percent={confidence}
                colors={['#ef4444', '#f59e0b', '#10b981']}
                arcWidth={0.3}
                textColor="hsl(var(--foreground))"
                formatTextValue={(value) => `${value}%`}
            />
            <div className="mt-4 text-center">
                <p className="text-sm font-body text-muted-foreground">
                    {confidence < 0.5 ? 'False Positive Confidence' : 'Confirmation Confidence'}
                </p>
            </div>
        </div>
    );
};

export default PredictionGauge;
