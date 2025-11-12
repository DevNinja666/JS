<input type="range" id="slider" min="10" max="40" value="16">

<script>
let slider = document.getElementById('slider');

slider.oninput = function() {
  document.body.style.fontSize = this.value + 'px';
}
</script>




