import '@/extensions/stringExtensions';
import { Input } from '@/Components/ui/input';
import { Label } from '../ui/label';
export type DualNumberInputProps = {
    legendLabel: string;
    firstInputLabel: string;
    firstInputName: string;
    firstInputid: string;
    secondInputLabel: string;
    secondInputName: string;
    secondInputid: string;
};

export default function DualNumberInput(props: DualNumberInputProps) {
    return (
        <fieldset className="space-y-1 flex flex-row">
            <legend className="font-bold">{props.legendLabel}</legend>
            <div className="flex gap-5 text-center">
                <div>
                    <Label htmlFor={props.firstInputid}>
                        {props.firstInputLabel}
                    </Label>
                    <Input
                        className="w-16"
                        type="number"
                        id={props.firstInputid}
                        name={props.firstInputName}
                    />
                </div>
                <div>
                    <Label htmlFor={props.secondInputid}>
                        {props.secondInputLabel}
                    </Label>
                    <Input
                        className="w-16"
                        type="number"
                        id={props.secondInputid}
                        name={props.secondInputName}
                    />
                </div>
            </div>
        </fieldset>
    );
}
