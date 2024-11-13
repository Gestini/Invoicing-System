export interface ModalProps {
    title: string;
    action: (...data: any) => void;
    inputs?: FormField[];
    textArea?: TextAreaField[];
    buttonTitle?: string;
    selectInputs?: SelectField[];
}

interface BaseField {
    name: string;
    label?: string;
    placeholder?: string;
}

interface FormField extends BaseField {
    type: string;
}

interface SelectField extends BaseField {
    options: SelectOption[];
}

interface SelectOption {
    label: string;
    value: string;
}

interface TextAreaField extends BaseField { }
