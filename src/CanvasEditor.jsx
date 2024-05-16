class CanvasEditor {
    constructor(canvasRef, templateData) {
      this.canvas = canvasRef.current;
      this.ctx = this.canvas.getContext('2d');
      this.templateData = templateData;
      this.imageData = null;
      this.backgroundColor = '#ffffff';
  
      this.initializeCanvas();
    }
  
    initializeCanvas() {
      this.canvas.width = 1080;
      this.canvas.height = 1080;
      this.drawBackground();
      this.loadImageMask();
    }
  
    drawBackground() {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    loadImageMask() {
      const img = new Image();
      img.src = this.templateData.urls.mask;
      img.onload = () => {
        this.ctx.drawImage(
          img,
          this.templateData.image_mask.x,
          this.templateData.image_mask.y,
          this.templateData.image_mask.width,
          this.templateData.image_mask.height
        );
        this.drawCaption();
        this.drawCTA();
      };
    }
  
    drawCaption() {
      const { caption } = this.templateData;
      this.ctx.fillStyle = caption.text_color;
      this.ctx.font = `${caption.font_size}px Arial`;
      const lines = this.breakTextIntoLines(caption.text, caption.max_characters_per_line);
      let y = caption.position.y;
      lines.forEach((line) => {
        this.ctx.fillText(line, caption.position.x, y);
        y += caption.font_size;
      });
    }
  
    drawCTA() {
      const { cta } = this.templateData;
      this.ctx.fillStyle = cta.background_color;
      this.roundRect(
        cta.position.x,
        cta.position.y,
        this.calculateCTAWidth(cta.text),
        this.calculateCTAHeight(cta.text),
        20,
        true,
        true
      );
      this.ctx.fillStyle = cta.text_color;
      this.ctx.font = '30px Arial';
      const lines = this.breakTextIntoLines(cta.text, 20);
      let y = cta.position.y + 30;
      lines.forEach((line) => {
        const x = cta.position.x + (this.calculateCTAWidth(cta.text) - this.ctx.measureText(line).width) / 2;
        this.ctx.fillText(line, x, y);
        y += 30;
      });
    }
  
    breakTextIntoLines(text, maxCharsPerLine) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
  
      for (let word of words) {
        const newLine = currentLine.length > 0 ? `${currentLine} ${word}` : word;
        if (newLine.length > maxCharsPerLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = newLine;
        }
      }
  
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
  
      return lines;
    }
  
    calculateCTAWidth(text) {
      const lines = this.breakTextIntoLines(text, 20);
      const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
      return this.ctx.measureText(longestLine).width + 48;
    }
  
    calculateCTAHeight(text) {
      const lines = this.breakTextIntoLines(text, 20);
      return lines.length * 30 + 48;
    }
  
    roundRect(x, y, width, height, radius, fill, stroke) {
      this.ctx.beginPath();
      this.ctx.moveTo(x + radius, y);
      this.ctx.lineTo(x + width - radius, y);
      this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.ctx.lineTo(x + width, y + height - radius);
      this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.ctx.lineTo(x + radius, y + height);
      this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.ctx.lineTo(x, y + radius);
      this.ctx.quadraticCurveTo(x, y, x + radius, y);
      this.ctx.closePath();
      if (stroke) {
        this.ctx.stroke();
      }
      if (fill) {
        this.ctx.fill();
      }
    }
  
    updateCaption(newCaption) {
      this.templateData.caption.text = newCaption;
      this.initializeCanvas();
    }
  
    updateCTA(newCTA) {
      this.templateData.cta.text = newCTA;
      this.initializeCanvas();
    }
  
    updateBackgroundColor(newColor) {
      this.backgroundColor = newColor;
      this.initializeCanvas();
    }
  }