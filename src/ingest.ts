interface IngestProps {
    id?: string;
    file: File;
    filename: string;
    encoding: string;
    mimetype: string;
}

export class Ingest {
    readonly id?: string;
    private _file: File;
    private _filename: string;
    private _encoding: string;
    private _mimetype: string;

    constructor(props: IngestProps) {
        if (!props.id) {
            this.id = crypto.randomUUID();
        }
        this._file = props.file;
        this._filename = props.filename;
        this._encoding = props.encoding;
        this._mimetype = Ingest.validateMimetype(props.mimetype);
    }

    static validateMimetype(mimetype: string) {
        const ALLOWED_TYPES = ['text/plain'];
        if (!ALLOWED_TYPES.includes(mimetype)) {
            throw new Error(
                'Apenas arquivos .txt (text/plain) são aceitos neste endpoint.',
            );
        }
        return mimetype;
    }
}
