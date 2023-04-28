const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
canvas.width = 1080;
canvas.height = 768;
const gravedad = 0.5;

class Jugador{
  constructor()
  {
    this.speed = 5;
    this.posicion =
    {
    x : 100, y : 100
    }
    this.velocidad =
    {
      x : 0, y : 1
    }
    this.width = 50;
    this.height = 50;
  }
 
  update()
  {
    this.posicion.x += this.velocidad.x;
    this.posicion.y += this.velocidad.y;
    if(this.posicion.y + this.height + this.velocidad.y <= canvas.height)
    this.velocidad.y += gravedad;
    this.draw();
  }

  draw()
  {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.posicion.x,this.posicion.y, this.width, this.height);
  }
}

class Plataforma  
{
  constructor({x,y})
  {
    this.posicion =
    {
      x,y
    }
    this.width = 300;
    this.height = 30;
  }
  draw()
  {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.posicion.x,this.posicion.y, this.width, this.height);
  }
}

let jugador = new Jugador();
let plataformas = [

  new Plataforma(
    {
    x:-1,y:700,
    }), 

  new Plataforma(
    {
      x:100,y:700
    }),

    new Plataforma(
      {
        x:500,y:700
      }),

      new Plataforma(
        {
          x:900,y:600
        }),

        new Plataforma(
          {
            x:1200,y:700
          }),
        
          new Plataforma(
            {
              x:1600,y:700
            })
  
]
let teclas =
{
  derecha:
  {presionado:false},
  izquierda:
  {presionado:false}
}

let scrollOffSet = 0;

function init()
{
jugador = new Jugador();
plataformas = [
  new Plataforma(
    {
    x:-1,y:700,
    }), 

  new Plataforma(
    {
      x:100,y:700
    }),

    new Plataforma(
      {
        x:500,y:700
      }),

      new Plataforma(
        {
          x:900,y:600
        }),

        new Plataforma(
          {
            x:1500,y:700
          })
]

 scrollOffSet = 0;
}

//Animacion de personaje
function animar()
{
  requestAnimationFrame(animar)
  ctx.fillStyle = 'aqua';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  plataformas.forEach(plataforma=>
    {
      plataforma.draw();
    }) 
    jugador.update();
  if (teclas.derecha.presionado && jugador.posicion.x < 750)
  {
    jugador.velocidad.x = jugador.speed;
  } else if ((teclas.izquierda.presionado && jugador.posicion.x > 100) || teclas.izquierda.presionado && scrollOffSet === 0 && 
    jugador.posicion.x > 0 )
  {
    jugador.velocidad.x = -jugador.speed;
  } else
  {
    jugador.velocidad.x = 0;

    if(teclas.derecha.presionado)
    {
      scrollOffSet += 2;
      plataformas.forEach(plataforma=>
        {
          plataforma.posicion.x -= 2;
        }) 
    } else if (teclas.izquierda.presionado && scrollOffSet > 0)
    {
      scrollOffSet -= jugador.speed;
      plataformas.forEach(plataforma=>
        {
          plataforma.posicion.x += 2;
        }) 
    }
  }

//Colision de plataformas
plataformas.forEach(plataforma => {
  if(jugador.posicion.y + jugador.height <= plataforma.posicion.y && jugador.posicion.y + jugador.height 
  + jugador.velocidad.y >= plataforma.posicion.y && jugador.posicion.x + jugador.width >= plataforma.posicion.x
  && jugador.posicion.x <= plataforma.posicion.x + plataforma.width)   
  { 
    jugador.velocidad.y = 0;
  }
})
//Condicion si ganas
if (scrollOffSet >1200)
{
  console.log('Ganaste el juego');  
}
//Condicion si pierdes
if(jugador.posicion.y > canvas.width)
{
  console.log('Perdiste');
  init()
}
}
//Movimiento de personaje
animar()
addEventListener('keydown', ({keyCode}) =>
{
  switch (keyCode)
  {
      case 65:
      console.log('izquierda');
      teclas.izquierda.presionado = true;
      break;

      case 83:
      console.log('abajo');
      break;

      case 68:
      console.log('derecha');
      teclas.derecha.presionado = true;
      break;
      
      case 87:
      console.log('arriba');
      jugador.velocidad.y -= 9;
      break;
  }
  console.log(teclas.derecha.presionado);
}
)

addEventListener('keyup', ({keyCode}) =>
{
  switch (keyCode)
  {
      case 65:
      console.log('izquierda');
      teclas.izquierda.presionado = false;
      break;

      case 83:
      console.log('abajo');
      break;

      case 68:
      console.log('derecha');
      teclas.derecha.presionado = false;
      break;
      
      case 87:
      console.log('arriba');
      jugador.velocidad.y -= 9;
      break;
  }
}
)
