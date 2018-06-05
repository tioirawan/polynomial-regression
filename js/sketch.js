const x_vals = []
const y_vals = []

const optimizer = tf.train.adadelta(0.2)

let isLooping = true
let drawing = false
let loss = 0
let info = {}

let pauseButton, inputMode
let showLine, showLoss, showGraph, showGrid, showLineGraph
let a, b, c, d, e, f, g, h, i, j, k

async function setup() {
  createCanvas(
    windowWidth * (windowWidth > 950 ? 0.74 : windowWidth > 450 ? 0.8 : 0.93),
    windowHeight * 0.94
  ).parent('canvas-content')

  a = tf.scalar(0).variable()
  b = tf.scalar(0).variable()
  c = tf.scalar(0).variable()
  d = tf.scalar(0).variable()
  e = tf.scalar(0).variable()
  f = tf.scalar(0).variable()
  g = tf.scalar(0).variable()
  h = tf.scalar(0).variable()
  i = tf.scalar(0).variable()
  j = tf.scalar(0).variable()
  k = tf.scalar(0).variable()

  info = {
    lr: select('#info-lr'),
    loss: select('#info-loss')
  }

  pauseButton = select('#pause-btn')
  inputMode = select('#input-mode')
  showLine = select('#show-line')
  showLineGraph = select('#show-line-graph')
  showLoss = select('#show-loss')
  showGraph = select('#show-graph')
  showGrid = select('#show-grid')
  degreeMode = select('#degree-mode')

  select('#randomize-btn').mousePressed(() => {
    clearData()

    x_vals.push(
      ...Array(floor(random(5, 30)))
        .fill()
        .map((v, i, c) => map(i + random(1), 0, c.length, -1, 1))
    )

    y_vals.push(...x_vals.map(x => x + random(abs(x) - 1, 1 - abs(x))))
  })

  pauseButton.mousePressed(() => {
    if (isLooping) {
      noLoop()
      pauseButton.html('Resume!')
    } else {
      loop()
      pauseButton.html('Pause!')
    }

    isLooping = !isLooping
  })

  select('#reset-btn').mousePressed(clearData)
}

function clearData() {
  x_vals.splice(0, x_vals.length)
  y_vals.splice(0, y_vals.length)
}

function windowResized() {
  resizeCanvas(
    windowWidth * (windowWidth > 950 ? 0.74 : windowWidth > 450 ? 0.8 : 0.93),
    windowHeight * 0.94
  )
}

function draw() {
  background('#333')
  translate(0, 0)

  if (drawing && inputMode.value() == '2' && frameCount % 3 === 0) {
    inputFromMouse()
  }

  if (x_vals.length && !drawing) {
    tf.tidy(() => {
      const xs = tf.tensor1d(x_vals)
      const ys = tf.tensor1d(y_vals)

      loss = optimizer
        .minimize(() => tf.losses.meanSquaredError(ys, predict(xs)), true)
        .dataSync()
    })
  }

  if (!x_vals.length) {
    noStroke()
    fill('#999')
    textSize(20)
    textAlign(CENTER)
    text('Click Anywhere!', width / 2, height * 0.25)
  }

  if (showGrid.checked()) drawGrid()
  if (showGraph.checked()) drawGraph()
  if (showLine.checked()) drawRegressionLine()
  
  updateText()
  drawGraphData()
}

function predict(x) {
  return polynomialDegree[Number(degreeMode.value()) - 1](x)
}

function mouseIsInsideCanvas() {
  return mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0
}

function mousePressed() {
  if (mouseIsInsideCanvas()) drawing = true
}

function mouseReleased() {
  drawing = false
}

function mouseClicked() {
  if (inputMode.value() == '1') inputFromMouse()
}

function inputFromMouse() {
  if (mouseIsInsideCanvas()) {
    x_vals.push(normalizeX(mouseX))
    y_vals.push(normalizeY(mouseY))
  }
}

function drawRegressionLine() {
  const curveX = Array(100)
    .fill()
    .map((v, i) => map(i, 0, 99, -1, 1))
  const guess = tf.tidy(() => predict(tf.tensor1d(curveX)))
  const curveY = guess.dataSync()

  noFill()
  strokeWeight(2)
  stroke('#1dd1a1')

  beginShape()

  curveX.forEach((x, i) => {
    vertex(denormalizeX(x), denormalizeY(curveY[i]))
  })

  endShape()

  guess.dispose()
}

function updateText() {
  fill('#999')
  noStroke()
  textSize(15)
  textAlign(CENTER)
  text(x_vals.length, width - 20, 15)
  info.lr.html(optimizer.learningRate)
  info.loss.html(Number(loss).toFixed(15))
}

function drawGraphData() {
  const xs = x_vals.map(denormalizeX)
  const ys = y_vals.map(denormalizeY)

  // sorted x data to draw conected points
  const pair = xs.map((x, i) => ({ x, y: ys[i] }))
  pair.sort((a, b) => a.x - b.x)

  beginShape()
  noFill()
  strokeWeight(0.5)
  stroke('#b2bec3')

  for (let i = 0; i < xs.length; i++) {
    // draw loss
    if (showLoss.checked()) {
      tf.tidy(() => {
        const x = tf.tensor1d([x_vals[i]])
        const guess = predict(x).dataSync()

        push()
        stroke('#ee5253')
        strokeWeight(1)
        line(xs[i], ys[i], xs[i], denormalizeY(guess))
        pop()
      })
    }

    if (showLineGraph.checked()) {
      if (i == 0 || i == xs.length - 1) curveVertex(pair[i].x, pair[i].y)
      curveVertex(pair[i].x, pair[i].y)
    }

    // draw dot points
    push()
    strokeWeight(8)
    stroke('#0984e3')
    point(xs[i], ys[i])
    pop()
  }

  endShape()
}

function drawGraph() {
  stroke('#999')
  strokeWeight(2)
  line(width / 2, 0, width / 2, height) // vertical
  line(0, height / 2, width, height / 2) // horizontal

  push()
  translate(width / 2, height / 2)

  const fit = n => map(n, 0, 10, 0, max(width, height) / 2)

  for (let i = 0; i <= 10; i++) {
    stroke(111)
    strokeWeight(2)
    if (i) {
      line(-3, fit(i), 3, fit(i))
      line(-3, fit(-i), 3, fit(-i))

      line(fit(i), -3, fit(i), 3)
      line(fit(-i), -3, fit(-i), 3)
    }

    noStroke()
    textSize(15)
    fill('#fff')

    textAlign(CENTER)
    text(i, fit(i) + 10, -2)
    text(-i, fit(-i) + 10, -2)

    if (i === 0) continue // skip 0 for y axes

    textAlign(LEFT)
    text(-i, 5, fit(i))
    text(i, 5, fit(-i))
  }
  pop()
}

function drawGrid() {
  push()
  translate(width / 2, height / 2)

  const fit = n => map(n, 0, 10, 0, max(width, height) / 2)

  for (let i = 0; i <= 10; i++) {
    strokeWeight(0.2)
    stroke('#444')

    line(fit(i), height / -2, fit(i), height / 2) // horizontal |
    line(fit(-i), height / -2, fit(-i), height / 2)

    line(-width / 2, fit(i), width / 2, fit(i)) // vertical --
    line(-width / 2, fit(-i), width / 2, fit(-i))
  }
  pop()
}
