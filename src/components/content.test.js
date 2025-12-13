import { describe, it, expect } from 'vitest';

function combinarColors(c1, c2) {
  const combinacions = {
    "cyan-yellow": "green",
    "yellow-cyan": "green",
    "cyan-magenta": "darkblue",
    "magenta-cyan": "darkblue",
    "yellow-magenta": "red",
    "magenta-yellow": "red"
  };
  return combinacions[`${c1}-${c2}`] || null;
}

function construirArrayTauler(numero) {
  const arrayTauler = [];
  for (let i = 0; i < numero; i++) {
    const fila = []
    for (let j = 0; j < numero; j++) {
      fila.push({
        valor: 0,
        color: "white"
      });
    }
    arrayTauler.push(fila);
  }
  return arrayTauler;
}

function taulerPle(estatCaselles) {
  for (let i = 0; i < estatCaselles.length; i++) {
    for (let j = 0; j < estatCaselles[i].length; j++) {
      if (estatCaselles[i][j].valor === 0) {
        return false;
      }
    }
  }
  return true;
}

describe('Sistema de Combinació de Colors', () => {
  it('hauria de combinar cian i groc per fer verd', () => {
    expect(combinarColors('cyan', 'yellow')).toBe('green');
    expect(combinarColors('yellow', 'cyan')).toBe('green');
  });

  it('hauria de combinar cian i magenta per fer blau fosc', () => {
    expect(combinarColors('cyan', 'magenta')).toBe('darkblue');
    expect(combinarColors('magenta', 'cyan')).toBe('darkblue');
  });

  it('hauria de combinar groc i magenta per fer roig', () => {
    expect(combinarColors('yellow', 'magenta')).toBe('red');
    expect(combinarColors('magenta', 'yellow')).toBe('red');
  });

  it('hauria de retornar null per a combinacions de colors invàlides', () => {
    expect(combinarColors('cyan', 'cyan')).toBeNull();
    expect(combinarColors('green', 'red')).toBeNull();
    expect(combinarColors('invalid', 'colors')).toBeNull();
  });
});

describe('Inicialització del Tauler', () => {
  it('hauria de crear un tauler 5x5 amb totes les cel·les buides', () => {
    const board = construirArrayTauler(5);
    
    expect(board).toHaveLength(5);
    board.forEach(row => {
      expect(row).toHaveLength(5);
      row.forEach(cell => {
        expect(cell.valor).toBe(0);
        expect(cell.color).toBe('white');
      });
    });
  });

  it('hauria de crear un tauler 7x7 amb l\'estructura correcta', () => {
    const board = construirArrayTauler(7);
    
    expect(board).toHaveLength(7);
    board.forEach(row => {
      expect(row).toHaveLength(7);
    });
  });

  it('hauria de detectar quan un tauler està completament ple', () => {
    const board = construirArrayTauler(3);
    
    expect(taulerPle(board)).toBe(false);
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = { valor: 1, color: 'cyan' };
      }
    }
    
    expect(taulerPle(board)).toBe(true);
  });

  it('hauria de detectar quan un tauler té almenys una cel·la buida', () => {
    const board = construirArrayTauler(3);
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = { valor: 1, color: 'cyan' };
      }
    }
    
    board[1][1] = { valor: 0, color: 'white' };
    
    expect(taulerPle(board)).toBe(false);
  });
});
