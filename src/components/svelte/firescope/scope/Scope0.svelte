<script>
// FireScope uses _input and _output props for its data
  export let width
  export let height
  export let _input
  export let _output

  let points = [
    {deg: 270, text: 'N', x: 56, y: 10, cls: 'compass-text-major'},
    {deg: 315, text: 'NE', x: 94, y: 25, cls: 'compass-text-minor'},
    {deg: 0, text: 'E', x: 110, y: 63, cls: 'compass-text-major'},
    {deg: 45, text: 'SE', x: 94, y: 102, cls: 'compass-text-minor'},
    {deg: 90, text: 'S', x: 56, y: 117, cls: 'compass-text-major'},
    {deg: 135, text: 'SW', x: 12, y: 102, cls: 'compass-text-minor'},
    {deg: 180, text: 'W', x: 0, y: 63, cls: 'compass-text-major'},
    {deg: 225, text: 'NW', x: 12, y: 25, cls: 'compass-text-minor'},
  ]

  let bubble = 'hidden'
  let wind = 'hidden'
  let rx, xBubble, yBubble, aspSin, aspCos
  let center = {x: 60, y: 60}
  $: {
    rx = 40 / $_output.lengthToWidthRatio
    bubble = ($_input.slopeSteepnessRatio < 0.01) ? 'hidden' : 'visible'
    wind = ($_input.windSpeedAtMidflame < 1) ? 'hidden' : 'visible'
    // Slope bubble center location
    aspSin = Math.sin($_input.slopeDirectionAspect * Math.PI / 180)
    aspCos = Math.cos($_input.slopeDirectionAspect * Math.PI / 180)
    xBubble = 60 - 60 * aspSin
    yBubble = 60 + 60 * aspCos
  }
</script>

<svg class="defs-only" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="display: block;">
  <defs>
    <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
    <linearGradient id="slopeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(186,238,190);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(15,139,26);stop-opacity:1" />
    </linearGradient>
    <linearGradient id="windGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(200,200,240);stop-opacity:1" />
      <stop offset="100%" style="stop-color:blue;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="slopeBubbleGradient" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0" />
      <stop offset="100%" stop-color="black" stop-opacity=".5" />
    </radialGradient>

    <symbol id="fireScope" >
      <circle r='48' class="fire-wind-slope-compass-face"
        transform="translate(60,60)" />
      <!-- markers -->
      {#each points as {deg, text, x, y, cls}}
        <line	class='major-tic'	y1='35'	y2='45'	transform='translate(60,60) rotate({deg})'/>
        <text x={x} y={y} class='{cls}'>{text}</text>
        <line class='minor-tic'	y1='42' y2='45'	transform='translate(60,60) rotate({deg + 15})'/>
        <line class='minor-tic'	y1='42' y2='45'	transform='translate(60,60) rotate({deg + 30})'/>
      {/each}
      <!-- slope bubble -->
      <g transform='translate(60,60) rotate({$_input.slopeDirectionAspect})'>
        <ellipse cx="0" cy="44" rx='4' ry='4'
          style="visibility:{bubble};"
          fill="url(#slopeBubbleGradient)" />
        <line class='slope-pointer'	y1='48' y2='54'
          style="visibility:{bubble};" />
        <text x="10"
          style="font: normal 4px sans-serif; visibility:{bubble};"
          transform='rotate(90 -16,15)'>{$_input.slopeSteepnessRatio.toFixed(0)}</text>
      </g>
      <!-- wind needle -->
      <g transform='translate(60,60) rotate({$_input.windDirectionSourceFromNorth})'>
        <polygon class='wind-needle'
          style="visibility:{wind};"
          fill="url(#windGradient)"
          points="0,44 6,38, 4,38, 4,30, -4,30, -4,38, -6,38" />
          <!-- points="0,42 6,-42 0,-36 -6,-42" /> -->
        <text x="1" style="font: normal 4px sans-serif;visibility:{wind};"
          transform='rotate(90 -16,15)'>wind</text>
      </g>
      <!-- fire ellipse -->
      <g transform='translate(60,60) rotate({$_output.fireHeadingFromNorth+180})'>
        <ellipse cx="0" cy="0" rx={rx} ry="40" fill="url(#fireGradient)" />
        <text style="font: normal 4px sans-serif;"
            transform='rotate(90 -16,15)'>
            {$_output.headingSpreadRate.toFixed(2)}
          </text>
        <text x="-70" style="font: normal 4px sans-serif;"
            transform='rotate(90 -16,15)'>
          {$_output.backingSpreadRate.toFixed(2)}
          </text>
        <text x="-35" y={-35/$_output.lengthToWidthRatio} style="font: normal 4px sans-serif;"
            transform='rotate(90 -16,15)'>
          {$_output.flankingSpreadRate.toFixed(2)}
          </text>
      </g>
    </symbol>
  </defs>
</svg>

<div class="firescope-box">
  <svg viewBox="0 0 130 130" width={width} height={height} >
    <use xlink:href="#fireScope"/>
      <text x="0" y="4"  class='info-text'>
        Fuel Model {$_input.fuelModelCatalogKey}
      </text>
      <text x="0" y="124" class='info-text'>
        FireScope 1.0.0
      </text>
       <line class='minor-tic' x1='0' y1='65' x2='130' y2='65'/>
      <text x={center.x-4} y={center.y+4} class='big-text'>X</text>
      <text x={xBubble} y={yBubble} style="font: normal 8px sans-serif;">
        ASP
      </text>
  </svg>
</div>

<style>
  .firescope-box {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.48);
  }
  .big-text {
    font: normal 8px sans-serif;
  }
  .compass-text-minor {
    font: normal 8px sans-serif;
  }

  .compass-text-major {
    font: bold 10px sans-serif;
  }

	.fire-needle {
		stroke: rgb(180,0,0);
    stroke-width: .5;
	}

	.fire-wind-slope-compass-face {
		stroke: #333;
    stroke-opacity: 50%;
		fill: white;
	}

  .info-text {
    font: normal 4px sans-serif;
  }

	.major-tic {
		stroke: #333;
		stroke-width: 1;
	}

	.minor-tic {
		stroke: #999;
		stroke-width: 0.5;
	}

	.slope-needle {
		stroke: rgb(16, 139, 26);
    stroke-width: .5;
	}

	.slope-pointer {
		stroke: #f00;
		stroke-width: 0.5;
	}

	.wind-needle {
		stroke: blue;
    stroke-width: .5;
	}
</style>
