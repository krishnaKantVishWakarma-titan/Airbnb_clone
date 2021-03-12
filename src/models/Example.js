import { useRef } from 'react';
import ReactDom from 'react-dom';

export default function Example ({open, onClose}) {

    const outRef = useRef(null);
    const inRef = useRef(null);
    const bom = e => {
        if (inRef.current.contains(e.target)) {
            return;
        }
        onClose();        
    }


    if (!open) return null;
    return ReactDom.createPortal(
        <>
        
            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'grey',
                    zIndex: 1,
                    top: 0
                }}

                ref={outRef}

                onClick={e => bom(e)}
            >
                <div
                    style={{
                        width: '400px',
                        height: '200px',
                        backgroundColor: 'white',
                        marginLeft: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '200px',
                        zIndex: 200,
                        position: 'absolute'
                    }}

                    ref={inRef}

                    onClick={e => bom(e)}
                >
                krishna
                </div>
            </div>

        </>,
        document.getElementById('portal')
    );
}