import labels from '../assets/labels.json'

export const renderBoxes = (canvas, boxesData, scoresData, classesData, ratios) => {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // configure font
    const font = `${Math.max(
        Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40), 
        14
    )}px Arial`
    ctx.font = font
    ctx.textBaseline = 'top'

    for (let i = 0; i < scoresData.length; i++) {
        const className = labels[classesData[i]]
        const score = (scoresData[i] * 100).toFixed(2)

        if (score >= 85) {
            // console.log(`class: ${className}\nscore: ${score}`)

            let [y1, x1, y2, x2] = boxesData.slice(4 * i, 4 * (i + 1))
            x1 *= ratios[0]
            x2 *= ratios[0]
            y1 *= ratios[1]
            y2 *= ratios[1]

            const width = x2 - x1
            const height = y2 - y1

            // draw box
            const color = '#FF7600'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
            ctx.fillRect(x1, y1, width, height)

            // draw border box
            ctx.strokeStyle = color
            ctx.lineWidth = Math.max(
                Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 
                2.5
            )
            ctx.strokeRect(x1, y1, width, height)

            // draw label background
            ctx.fillStyle = color
            const textWidth = ctx.measureText(className + ' - ' + score + '%').width
            const textHeight = parseInt(font, 10)
            const yText = y1 - (textHeight + ctx.lineWidth)
            ctx.fillRect(
                x1 - 1, 
                yText < 0 ? 0 : yText, // handle overflow label box
                textWidth + ctx.lineWidth, 
                textHeight + ctx.lineWidth
            )

            // draw label
            ctx.fillStyle = '#FFFFFF'
            ctx.fillText(
                className + ' - ' + score + '%', 
                x1 - 1, 
                yText < 0 ? 0 : yText
            )
        }
    }
}