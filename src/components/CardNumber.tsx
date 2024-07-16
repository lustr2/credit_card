import { useRef, useEffect, useState } from "react";

const CardNumber = () => {
    const [numberActiveInput, setNumberActiveInput] = useState<number>(1);
    const [cislo, setCislo] = useState<number[]>([0,0,0,0]);
    const [pocetChyb, setPocetChyb] = useState<number>(0);
    const [activeFocus, setActiveFocus] = useState<string | null>(null);
//    const [tmpCislo, setTmpCislo] = useState<number>(0);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const inputRef1 = useRef<HTMLInputElement>(null!);
    const inputRef2 = useRef<HTMLInputElement>(null!);
    const inputRef3 = useRef<HTMLInputElement>(null!);
    const inputRef4 = useRef<HTMLInputElement>(null!);

    const buttonRef5 = useRef<HTMLButtonElement>(null!);


    useEffect (() => {
        if (numberActiveInput > 4) {
//            console.log(cislo);
            buttonRef5.current.focus();
            return;
        }
        inputRefs.current[numberActiveInput - 1]?.focus();

    },[numberActiveInput]);

    /** Hlida, delku vlozeneho cisla */
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (numberActiveInput === 5) {
            return;
        }
        if ((e.target.value.length === 4) && (index < 4)) {
            setNumberActiveInput(oldNumber => oldNumber+1)
            if (cislo.length >= numberActiveInput) {
                setCislo(oldCislo => { 
                    const newCislo: number[] = [...oldCislo];
                    newCislo[numberActiveInput-1] = Number.parseInt(e.target.value);
                    return newCislo;
                });
//                setTmpCislo(0);
            }
        }
    }

    /** Kontrola, zda je stisneno pouze cislo, pokud ne, po 10 spatnych pokusech vypise alert */
    const handleKeyDown = (e: KeyboardEvent) => {
        // Check if the key pressed is an alphanumeric character
        const isNumeric = /^[0-9]$/i.test(e.key);
        const allowedKeys = [
            'Tab', 'Delete', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape', 'Shift', 
            'Control', 'Alt', 'CapsLock', 'Home', 'End', 'PageUp', 'PageDown', 'Insert' ];
        // neni to cislo nebo je cisel vic nez 4
        if (((!isNumeric) && !allowedKeys.includes(e.key)) || (cislo[numberActiveInput-1]>9999)) {
            e.preventDefault();
//            console.log("Stisknuto neco jineho nez 0-9: " + e.key);
            if (pocetChyb == 10) {
                alert('Lze vkladat pouze cisla ;-)');
            }
            setPocetChyb(oldChyb => oldChyb === 10 ? 0: oldChyb+1);
        } else {
            // ulozim si docasne cislo => neni spravne
//            const t : number = Number.parseInt(tmpCislo.toString() + e.key);
        }
    } 

    useEffect (() => {
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);
    
    /**  Nastavi aktualni focus input objektu */
    const handleFocus = (e: FocusEvent) => {
        const target = e.target as HTMLInputElement;
        if (activeFocus !== target.name) {
            setActiveFocus(target.name);
//            console.log('Zmena: ' + Number.parseInt(target.name.substring(target.name.toString().length-1)));
            setNumberActiveInput(Number.parseInt(target.name.substring(target.name.toString().length-1)));
        }
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
          input.addEventListener('focus', handleFocus);
        });
    
        return () => {
            inputs.forEach(input => {
                input.removeEventListener('focus', handleFocus);
              });
            }
    },[activeFocus]);

    const handleSubmit = () => {
        // pojistka, kdyby to clovek odeslal drive nez vsechno vyplni => nefunguje
        // setCislo(oldCislo => { 
        //     const newCislo: number[] = [...oldCislo];
        //     newCislo[numberActiveInput-1] = tmpCislo;
        //     return newCislo;
        // });
        
        alert('Odeslané číslo karty je: ' + cislo[0] + ' ' + cislo[1] + ' ' + cislo[2] + ' ' + cislo[3]);
        if (inputRefs.current !== null ) {
            inputRefs.current[0]?.focus();
        }
        window.location.reload();
//        setTmpCislo(0);
    };

    const handleReset = () => {
        window.location.reload();
    };

//    console.log(activeFocus);
    return (
      <>
        <div className='block-row'>
            <label className="label">Zadejte číslo karty</label>
            <div className="input-row">
                {Array.from({ length: 4 }).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        name={`cisla${index + 1}`}
                        placeholder="1234"
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleChangeInput(e, index)}
                        onKeyDown={(e) => handleKeyDown(e as unknown as KeyboardEvent)}
                        maxLength={4}
                    />
                ))}   
                <button className='button-design' ref={buttonRef5} onClick={handleSubmit}> Odeslat</button>
                <button className='button-design' onClick={handleReset}> Vymazat</button>
            </div>
        </div>
      </>
    );
}

export default CardNumber;
