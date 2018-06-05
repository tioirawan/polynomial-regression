const polynomialDegree = [
  x => tf.tidy(() => a.mul(x).add(b)),
  x =>
    tf.tidy(() =>
      a
        .mul(x.square())
        .add(b.mul(x))
        .add(c)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(3)))
        .add(b.mul(x.square()))
        .add(c.mul(x))
        .add(d)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(4)))
        .add(b.mul(x.pow(tf.scalar(3))))
        .add(c.mul(x.square()))
        .add(d.mul(x))
        .add(e)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(5)))
        .add(b.mul(x.pow(tf.scalar(4))))
        .add(c.mul(x.pow(tf.scalar(3))))
        .add(d.mul(x.square()))
        .add(e.mul(x))
        .add(f)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(6)))
        .add(b.mul(x.pow(tf.scalar(5))))
        .add(c.mul(x.pow(tf.scalar(4))))
        .add(d.mul(x.pow(tf.scalar(3))))
        .add(e.mul(x.square()))
        .add(f.mul(x))
        .add(g)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(7)))
        .add(b.mul(x.pow(tf.scalar(6))))
        .add(c.mul(x.pow(tf.scalar(5))))
        .add(d.mul(x.pow(tf.scalar(4))))
        .add(e.mul(x.pow(tf.scalar(3))))
        .add(f.mul(x.pow(tf.scalar(4))))
        .add(g.mul(x))
        .add(h)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(8)))
        .add(b.mul(x.pow(tf.scalar(7))))
        .add(c.mul(x.pow(tf.scalar(6))))
        .add(d.mul(x.pow(tf.scalar(5))))
        .add(e.mul(x.pow(tf.scalar(4))))
        .add(f.mul(x.pow(tf.scalar(3))))
        .add(g.mul(x.square()))
        .add(h.mul(x))
        .add(i)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(9)))
        .add(b.mul(x.pow(tf.scalar(8))))
        .add(c.mul(x.pow(tf.scalar(7))))
        .add(d.mul(x.pow(tf.scalar(6))))
        .add(e.mul(x.pow(tf.scalar(5))))
        .add(f.mul(x.pow(tf.scalar(4))))
        .add(g.mul(x.pow(tf.scalar(3))))
        .add(h.mul(x.square()))
        .add(i.mul(x))
        .add(j)
    ),
  x =>
    tf.tidy(() =>
      a
        .mul(x.pow(tf.scalar(10)))
        .add(b.mul(x.pow(tf.scalar(9))))
        .add(c.mul(x.pow(tf.scalar(8))))
        .add(d.mul(x.pow(tf.scalar(7))))
        .add(e.mul(x.pow(tf.scalar(6))))
        .add(f.mul(x.pow(tf.scalar(5))))
        .add(g.mul(x.pow(tf.scalar(4))))
        .add(h.mul(x.pow(tf.scalar(3))))
        .add(i.mul(x.square()))
        .add(j.mul(x))
        .add(k)
    )
]
