<?php

$tabs = $attributes['tabs'];

$get_tabs = array_map(function ($id, $label) {
	return [
		"id"    => 'tab-' . $id,
		"label" => $label,
		"panel" => 'panel-' . $id,
	];
}, array_keys($tabs), $tabs);
  

$get_contents = array_map(function ($id, $innerblock) {
	return [
		"id"    => 'tab-' . $id,
		"content" => !empty($innerblock['innerBlocks']) ? render_block(current($innerblock['innerBlocks'])) : apply_filters('the_content', $innerblock['innerHTML']),
		"panel" => 'panel-' . $id,
	];
}, array_keys($block->parsed_block['innerBlocks']), $block->parsed_block['innerBlocks']);

wp_interactivity_state(
	'tabbed-content',
	array(
		'domElement' => [],
		'contents' => $get_contents,
		'tabFocus' => 0
	),
);

?>

<div
	data-wp-interactive="tabbed-content"
	data-wp-init="callbacks.tabbedInit" 
	<?php echo wp_kses_data(get_block_wrapper_attributes(['class' => 'tabs'])); ?>>
	<?php if ($tabs) { ?>
		<div 
			role="tablist" 
			aria-label="Sample Tabs"
			data-wp-context='<?php echo json_encode(["tabs" => $get_tabs]); ?>'>
			<template data-wp-each--tab="context.tabs" data-wp-each-key="context.tab.id">
				<button role="tab"
					data-wp-on--click="actions.toggle"
					data-wp-on--keydown="actions.logKeydown"
					data-wp-text="context.tab.label"
					data-wp-bind--aria-controls="context.tab.panel"
					data-wp-bind--id="context.tab.id"
					aria-selected="false"
					tabindex="-1">
				</button>
			</template>
		</div>
		<?php foreach ($block->parsed_block['innerBlocks'] as $key => $innerblock) { ?>
			<div 
				id="panel-<?php echo $key ?>" 
				role="tabpanel" 
				data-id="tab-<?php echo esc_attr($key) ?>" 
				tabindex="0" 
				aria-labelledby="tab-<?php echo esc_attr($key) ?>" 
				hidden="true">
				<?php echo !empty($innerblock['innerBlocks']) ? render_block(current($innerblock['innerBlocks'])) : $innerblock['innerHTML']; ?>
			</div>
		<?php } ?>
	<?php } ?>
</div>
